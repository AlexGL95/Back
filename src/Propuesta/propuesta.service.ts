import { Injectable } from '@nestjs/common';
import { Propuestadto } from './dto/crearPropuesta.dto';
import { Propuesta } from './propuesta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment = require('moment');
import PDFDocument = require('pdfkit');
import fs = require('fs');
import { Categoria } from 'src/Categoria/categoria.entity';
import { CategoriaService } from 'src/categoria/categoria.service';

@Injectable()
export class PropuestaService {

    path: string;

    constructor(
        @InjectRepository(Propuesta)
        private propuestaRepository: Repository<Propuesta>,
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ){}

    generarPDF(nombre: string, telefono: string, correo: string, codigo: string, colonia: string, problema: string, propuesta: string, categoria: string){
        let doc = new PDFDocument;
        const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        doc.pipe(fs.createWriteStream('./pdfs/output.pdf'));
        doc.fillColor('red').font('Helvetica-Bold').text('Folio', {
            lineBreak : true,
            lineGap: 25,
        }).fillColor('black').font('Helvetica-Bold').text('NOMBRE COMPLETO ', {
            lineBreak : true,
            lineGap: 10,
        }).font('Helvetica').text(nombre, {
            lineBreak : true,
            lineGap: 25,
        }).font('Helvetica-Bold').text('TELÉFONO', {
            lineBreak : true,
            lineGap: 10,
        }).font('Helvetica').text(telefono, {
            lineBreak : true,
            lineGap: 25,
        }).font('Helvetica-Bold').text('CÓDIGO POSTAL', {
            lineBreak : true,
            lineGap: 10,
        }).font('Helvetica').text(codigo, {
            lineBreak : true,
            lineGap: 25,
        }).font('Helvetica-Bold').text('TIPO DE QUEJA', {
            lineBreak : true,
            lineGap: 10,
        }).font('Helvetica').text(categoria, {
            lineBreak : true,
            lineGap: 25,
        }).font('Helvetica-Bold').text('PROBLEMA', {
            lineBreak : true,
            lineGap: 10,
        }).font('Helvetica').text(problema, {
            lineBreak : true,
            lineGap: 5,
            align: 'justify',
        }).font('Helvetica-Bold').text('PROPUESTA', {
            lineBreak : true,
            lineGap: 10,
        }).font('Helvetica').text(propuesta, {
            lineBreak : true,
            lineGap: 5,
            align: 'justify',
        });
        doc.moveDown();
        doc.font('Helvetica-Bold').text('ADJUNTO', {
            lineBreak : true,
            lineGap: 10,
        });
        doc.font('Helvetica')
        .fillColor('red')
        .text('Evidencia', {
          link: 'http://apple.com/',
          underline: true
        }).fillColor('black').font('Helvetica-Bold').text('CORREO ELECTRÓNICO', 350, 173, {
            lineBreak : true,
            lineGap: 10,
        }).font('Helvetica').text(correo, {
            lineBreak : true,
            lineGap: 25,
        }).font('Helvetica-Bold').text('CLONIA', {
            lineBreak : true,
            lineGap: 10,
        }).font('Helvetica').text(colonia, {
            lineBreak : true,
            lineGap: 10,
        });
        doc.end();
    }

    async guardarPropuesta(nuevaPropuesta: Propuestadto): Promise<Propuesta>{
        const categoria = await this.categoriaRepository.find();
        const newPropuesta = new Propuesta();

        let d4 = moment().format('MMM Do YY')

        newPropuesta.nombre = nuevaPropuesta.nombre;
        newPropuesta.telefono = nuevaPropuesta.telefono;
        newPropuesta.correo = nuevaPropuesta.correo;
        newPropuesta.codigoPostal = nuevaPropuesta.codigoPosta;
        newPropuesta.colonia = nuevaPropuesta.colonia;
        newPropuesta.problema = nuevaPropuesta.problema;
        newPropuesta.categoria = categoria[nuevaPropuesta.categoria]
        newPropuesta.propuesta = nuevaPropuesta.propuesta;
        newPropuesta.fecha = d4;
        newPropuesta.anexos = this.path;
        newPropuesta.activa = false;

        this.generarPDF(newPropuesta.nombre, newPropuesta.telefono, newPropuesta.correo, newPropuesta.codigoPostal, newPropuesta.colonia, newPropuesta.problema, newPropuesta.propuesta, newPropuesta.categoria.tipo);

        return await this.propuestaRepository.save(newPropuesta);
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

    constructor(
        @InjectRepository(Propuesta)
        private propuestaRepository: Repository<Propuesta>,
        private categoriaService: CategoriaService
    ) {}

    // Metodo para leer una pagina de reportes ciudadadanos.
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

}
