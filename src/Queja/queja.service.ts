import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queja } from 'src/Queja/queja.entity';
import { Moment } from "moment";
import { Repository } from 'typeorm';
import { createquejadto } from './Dto/queja.dto';
import { CategoriaService } from 'src/Categoria/categoria.service';
import PDFDocument = require('pdfkit');
import fs = require('fs');
import moment = require('moment');
import { ArchivosService } from 'src/archivos/archivos.service';
import { Categoria } from 'src/Categoria/categoria.entity';
import { AreaPropuestas } from 'src/Categoria/Areas/areaPropuestas.entity';

@Injectable()
export class QuejaService {

    path: string = '';

    constructor(
        private categoriaService: CategoriaService,
        private archivosService: ArchivosService,
        @InjectRepository(Queja)
        private quejaRepository : Repository<Queja>,
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
        @InjectRepository(AreaPropuestas)
        private areaPRepository: Repository<AreaPropuestas>,
    ){}

    // Creacion de quejas
    async createqueja(newqueja: createquejadto): Promise<string>{
        const categoria = await this.categoriaRepository.find();
        const area = await this.areaPRepository.find();
        console.log('Se quejo');
        let d4 = moment().format('MMM Do YY');
        let queja = new Queja;
        queja.id=0;
        queja.nombre = newqueja.nombre;
        queja.telefono = newqueja.telefono;
        queja.correo = newqueja.correo;
        queja.codigoPostal = newqueja.cp;
        queja.colonia = newqueja.colonia;
        queja.categoria = categoria[newqueja.categoria-1];
        queja.area = area[newqueja.area-1];
        queja.queja = newqueja.queja;
        queja.evidencia=this.path;
        queja.fecha= d4;
        queja.folio=':D';
        queja.activa = true;
        queja.afiliacion = false;
        console.log(queja);

        let nuevaQ = await this.quejaRepository.save(queja);
        let folio = this.archivosService.generarFolio('Q', moment().format("MMM Do YY"), nuevaQ.id);
        nuevaQ.folio = folio; //Actualizacion del folio
        await this.quejaRepository.update(nuevaQ.id, nuevaQ);

        this.archivosService.generarPDFQ(queja.nombre, queja.telefono, queja.correo, queja.codigoPostal, queja.colonia, queja.queja, queja.categoria.tipo, queja.area.area, queja.evidencia, folio);
        this.path = '';
        return folio;
    }

    // Metodo para leer una pagina de reportes ciudadadanos.
    async obtenerQueja( categoria: number, area: number, pagina: number ): Promise<{ rcArr: Queja[], nSig: number }> {
        // Declaracion de variables y constantes.
        const skip = (pagina-1) * 10;
        let rcArr: Queja[] = [];
        // Si no tiene categoria ni area = retorna cualquier paginacion disponible.
        if( (categoria == 0) && (area == 0) ) {
            rcArr = await this.quejaRepository.find( {  skip: skip, take: 50 } );
        }
        // Si no tiene area pero si categoria = retorna la paginacion correspondiente a la categoria.
        else if( (categoria != 0) && (area == 0) ) {
            const categoriasArr = await this.categoriaService.obtenerCategoria();
            rcArr = await this.quejaRepository.find( { where: { categoria: categoriasArr[categoria - 1] }, skip: skip, take: 50 } );
        }
        // Si tiene area y categoria = retorna la paginacion correspondiente al area de la categoria.
        else if( (categoria != 0) && (area != 0) ) {
            const categoriasArr = await this.categoriaService.obtenerCategoria();
            const areasArr = await this.categoriaService.obtenerAreasQ();
            rcArr = await this.quejaRepository.find( { where: { categoria: categoriasArr[categoria - 1], area: areasArr[area - 1] }, skip: skip, take: 50 } );
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

    pathFile(files: File){
        console.log(files[0]);
        this.path = files[0].path;
    }
    async obtenerQuejaGraph( categoria: number, area: number, fecha1: string, fecha2: string): Promise<any[]> {
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
            let rcArr: Queja[];
            // Si no tiene categoria ni area = retorna cualquier paginacion disponible.
            if( (categoria == 0) && (area == 0) ) {
                rcArr = await this.quejaRepository.find( { where: { fecha: fecha.format("MMM Do YY") } } );
            }
            // Si no tiene area pero si categoria = retorna la paginacion correspondiente a la categoria.
            else if( (categoria != 0) && (area == 0) ) {
                const categoriasArr = await this.categoriaService.obtenerCategoria();
                rcArr = await this.quejaRepository.find( { where: { fecha: fecha.format("MMM Do YY"), categoria: categoriasArr[categoria - 1] } } );
            }
            // Si no tiene area pero si categoria = retorna la paginacion correspondiente a la categoria.
            else if( (categoria != 0) && (area != 0) ) {
                const categoriasArr = await this.categoriaService.obtenerCategoria();
                const areasArr = await this.categoriaService.obtenerAreasRC();
                rcArr = await this.quejaRepository.find( { where: { fecha: fecha.format("MMM Do YY"), categoria: categoriasArr[categoria - 1], area: areasArr[area - 1] } } );
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
