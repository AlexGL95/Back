import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propuesta } from './propuesta.entity';
var moment = require('moment');
import { Moment } from "moment";
import { CategoriaService } from 'src/categoria/categoria.service';

@Injectable()
export class PropuestaService {

    constructor(
        @InjectRepository(Propuesta)
        private propuestaRepository: Repository<Propuesta>,
        private categoriaService: CategoriaService
    ) {}

    // Metodo para leer una pagina de propuestas.
    async obtenerPropuesta( categoria: number, area: number, pagina: number ): Promise<{ rcArr: Propuesta[], nSig: number }> {
        // Declaracion de variables y constantes.
        const skip = (pagina-1) * 10;
        let rcArr: Propuesta[] = [];
        // Si no tiene categoria ni area = retorna cualquier paginacion disponible.
        if( (categoria == 0) && (area == 0) ) {
            rcArr = await this.propuestaRepository.find( {  skip: skip, take: 50 } );
        }
        // Si no tiene area pero si categoria = retorna la paginacion correspondiente a la categoria.
        else if( (categoria != 0) && (area == 0) ) {
            const categoriasArr = await this.categoriaService.obtenerCategoria();
            rcArr = await this.propuestaRepository.find( { where: { categoria: categoriasArr[categoria - 1] }, skip: skip, take: 50 } );
        }
        // Si tiene area y categoria = retorna la paginacion correspondiente al area de la categoria.
        else if( (categoria != 0) && (area != 0) ) {
            const categoriasArr = await this.categoriaService.obtenerCategoria();
            const areasArr = await this.categoriaService.obtenerAreasRC();
            rcArr = await this.propuestaRepository.find( { where: { categoria: categoriasArr[categoria - 1], area: areasArr[area - 1] }, skip: skip, take: 50 } );
        }
        else {
            console.log('paso error');
            console.log(categoria, area, pagina);
        }
        // Numero de paginaciones siguientes entre 0 y 4.
        let nSig: number;
        if( rcArr.length < 11 ) { nSig = 0 }
        else if( (rcArr.length >= 11) && (rcArr.length < 21) ) { nSig = 1 }
        else if( (rcArr.length >= 21) && (rcArr.length < 31) ) { nSig = 2 }
        else if( (rcArr.length >= 31) && (rcArr.length < 41) ) { nSig = 3 }
        else if( rcArr.length >= 41 ) { nSig = 4 }
        // Construccion del objeto.
        let paginacion = {
            rcArr: rcArr.slice(0, 10),
            nSig: nSig
        }
        return paginacion;
    }

    // Metodo para obtener un segmento de la graficas correspondientes a Propuestas.
    async obtenerPropuestaGraph( categoria: number, area: number, fecha1: string, fecha2: string): Promise<any[]> {
        let fechaIni: Moment = moment(fecha1, "MMM Do YY");
        let fecha: Moment = moment(fecha1, "MMM Do YY").subtract(1, 'days');
        let fechaFin: Moment = moment(fecha2, "MMM Do YY");
        let diferencia = fechaFin.diff(fechaIni, 'days');
        let response: any[] = [];
        let arrTemp: any[] = [];
        for (let m = 0; m <= diferencia; m++) {
            arrTemp = [];
            fecha.add(1, 'days');
            arrTemp.push(fecha.format("MMM Do YY"));
            let rcArr: Propuesta[];
            // Si no tiene categoria ni area = retorna cualquier paginacion disponible.
            if( (categoria == 0) && (area == 0) ) {
                rcArr = await this.propuestaRepository.find( { where: { fecha: fecha.format("MMM Do YY") } } );
            }
            // Si no tiene area pero si categoria = retorna la paginacion correspondiente a la categoria.
            else if( (categoria != 0) && (area == 0) ) {
                const categoriasArr = await this.categoriaService.obtenerCategoria();
                rcArr = await this.propuestaRepository.find( { where: { fecha: fecha.format("MMM Do YY"), categoria: categoriasArr[categoria - 1] } } );
            }
            // Si no tiene area pero si categoria = retorna la paginacion correspondiente a la categoria.
            else if( (categoria != 0) && (area != 0) ) {
                const categoriasArr = await this.categoriaService.obtenerCategoria();
                const areasArr = await this.categoriaService.obtenerAreasRC();
                rcArr = await this.propuestaRepository.find( { where: { fecha: fecha.format("MMM Do YY"), categoria: categoriasArr[categoria - 1], area: areasArr[area - 1] } } );
            }
            else {
                console.log('Paso error');
                console.log(categoria, area, fecha1, fecha2);
            }
            arrTemp.push(rcArr.length);
            response.push(arrTemp);
        }
        return response;
    }

}
