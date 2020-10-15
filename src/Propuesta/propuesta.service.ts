import { Injectable } from '@nestjs/common';
import { Propuestadto } from './dto/crearPropuesta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment = require('moment');

import PDFDocument = require('pdfkit');
import fs = require('fs');
import { Categoria } from 'src/Categoria/categoria.entity';
import { CategoriaService } from 'src/Categoria/categoria.service';
import { AreaPropuestas } from 'src/Categoria/Areas/areaPropuestas.entity';
import { AreaQuejas } from 'src/Categoria/Areas/areaQuejas.entity';
import { ArchivosService } from 'src/archivos/archivos.service';
import { Propuesta } from './propuesta.entity';
import { Moment } from "moment";

@Injectable()
export class PropuestaService {

    path: string = '';

    constructor(
        private archivosService: ArchivosService,
        private categoriaService: CategoriaService,
        @InjectRepository(Propuesta)
        private propuestaRepository: Repository<Propuesta>,
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
        @InjectRepository(AreaPropuestas)
        private areaPRepository: Repository<AreaPropuestas>,
    ){}

    

    async guardarPropuesta(nuevaPropuesta: Propuestadto): Promise<string>{
        const categoria = await this.categoriaService.obtenerCategoria();
        const area = await this.categoriaService.obtenerAreasP();
        console.log(categoria);
        const newPropuesta = new Propuesta();

        let d4 = moment().format('MMM Do YY');

        newPropuesta.nombre = nuevaPropuesta.nombre;
        newPropuesta.telefono = nuevaPropuesta.telefono;
        newPropuesta.correo = nuevaPropuesta.correo;
        newPropuesta.codigoPostal = nuevaPropuesta.codigoPostal;
        newPropuesta.colonia = nuevaPropuesta.colonia;
        newPropuesta.problema = nuevaPropuesta.problema;
        newPropuesta.categoria = categoria[nuevaPropuesta.categoria-1];
        newPropuesta.area = area[nuevaPropuesta.area-1];
        newPropuesta.propuesta = nuevaPropuesta.propuesta;
        newPropuesta.fecha = d4;
        newPropuesta.folio = '';
        newPropuesta.anexos = this.path;
        newPropuesta.activa = false;
        newPropuesta.afiliacion = false;

        let nuevaP = await this.propuestaRepository.save(newPropuesta);
        let folio = this.archivosService.generarFolio('P', moment().format("MMM Do YY"), nuevaP.id);
        nuevaP.folio = folio; //Actualizacion del folio
        await this.propuestaRepository.update(nuevaP.id, nuevaP);
        console.log(nuevaP);

        this.archivosService.generarPDFP(newPropuesta.nombre, newPropuesta.telefono, newPropuesta.correo, newPropuesta.codigoPostal, newPropuesta.colonia, newPropuesta.problema, newPropuesta.propuesta, newPropuesta.categoria.tipo, newPropuesta.area.area, newPropuesta.anexos, folio);
        let pdfPath = `./pdfs/propuestas/propuesta${folio}.pdf`
        this.path = '';
        return folio;
    }

    async obtenerPropuestas(): Promise<Propuesta[]>{
        return await this.propuestaRepository.find();
    }

    async borrarPropuesta(id: number): Promise<Propuesta[]>{
        await this.propuestaRepository.delete(id);
        return await this.propuestaRepository.find();
    }

    pathFile(files: File){
        console.log(files[0]);
        this.path = files[0].path;
    }

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

    async verPropuesta(id: number){
        let ver = await this.propuestaRepository.findOne(id, {relations:['categoria', 'area']});
        let verPath = '';
        try {
            fs.statSync(`./pdfs/propuestas/propuesta${ver.folio}.pdf`);
            verPath = `./pdfs/propuestas/propuesta${ver.folio}.pdf`
            return verPath;
        }
        catch (err) {
          if (err.code === 'ENOENT') {
            console.log(ver.area);
            this.archivosService.generarPDFP(ver.nombre, ver.telefono, ver.correo, ver.codigoPostal, ver.colonia, ver.problema, ver.propuesta, ver.categoria.tipo, ver.area.area, ver.anexos, ver.folio);
            
            verPath = `./pdfs/propuestas/propuesta${ver.folio}.pdf`
            return verPath;
          }
        }
        
        
    }

}
