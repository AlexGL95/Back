import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
var moment = require('moment');
import { reporteCiudadano } from './reporte-ciudadano.entity';
import { ReporteCiudadanoDTO } from './dto/reporte-ciudadano.dto';
import { ReporteCiudadanoInterface } from "./interface/ReporteCiudadanoInterface.interface";
import { CategoriaService } from 'src/Categoria/categoria.service';


@Injectable()
export class ReporteCiudadanoService {

    constructor(
        @InjectRepository(reporteCiudadano)
        private rcRepository: Repository<reporteCiudadano>,
        private categoriaService: CategoriaService
    ) {}

    // Metodo para generar un nuevo reporte ciudadadano y guardarlo en DB.
    async guardarRC( body: ReporteCiudadanoDTO ): Promise<string> {

        // Folio.
        let folio = 'folio';
        // Categorias y areas.
        const categoriasArr = await this.categoriaService.obtenerCategoria();
        const areasArr = await this.categoriaService.obtenerAreasRC();
        // Generacion del objeto.
        let nuevoRC: ReporteCiudadanoInterface = {
            nombre: "",
            telefono: "",
            correo: "",
            codigoPostal: body.cp,
            colonia: body.colonia,
            categoria: categoriasArr[body.categoria - 1], //Menos 1 porque el categoriasArr abarca el 0.
            area: areasArr[body.area - 1],
            reporte: body.reporte,
            anexos: "",
            fecha: moment().format("MMM Do YY"),
            folio: folio,
            activa: false,
            afiliacion: false
        };
        if (body.nombre) { nuevoRC.nombre = body.nombre; }
        if (body.telefono) { nuevoRC.telefono = body.telefono; }
        if (body.correo) { nuevoRC.correo = body.correo; }
        // Guardado en DB.
        await this.rcRepository.save(nuevoRC);
        return folio;

    }

    // Metodo para leer una pagina de reportes ciudadadanos.
    async obtenerRC( categoria: number, area: number, pagina: number ): Promise<{ rcArr: reporteCiudadano[], nSig: number }> {
        // Declaracion de variables y constantes.
        const skip = (pagina-1) * 10;
        let rcArr: reporteCiudadano[] = [];
        // Si no tiene categoria ni area = retorna cualquier paginacion disponible.
        if( (categoria == 0) && (area == 0) ) {
            rcArr = await this.rcRepository.find( {  skip: skip, take: 50 } );
        }
        // Si no tiene area pero si categoria = retorna la paginacion correspondiente a la categoria.
        else if( (categoria != 0) && (area == 0) ) {
            const categoriasArr = await this.categoriaService.obtenerCategoria();
            rcArr = await this.rcRepository.find( { where: { categoria: categoriasArr[categoria - 1] }, skip: skip, take: 50 } );
        }
        // Si tiene area y categoria = retorna la paginacion correspondiente al area de la categoria.
        else if( (categoria != 0) && (area != 0) ) {
            const categoriasArr = await this.categoriaService.obtenerCategoria();
            const areasArr = await this.categoriaService.obtenerAreasRC();
            rcArr = await this.rcRepository.find( { where: { categoria: categoriasArr[categoria - 1], area: areasArr[area - 1] }, skip: skip, take: 50 } );
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

}
