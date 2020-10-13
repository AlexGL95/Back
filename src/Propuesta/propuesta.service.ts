import { Injectable } from '@nestjs/common';
import { Propuestadto } from './dto/crearPropuesta.dto';
import { Propuesta } from './propuesta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment = require('moment');
import PDFDocument = require('pdfkit');
import fs = require('fs');

@Injectable()
export class PropuestaService {

    path: string;
    originalname: string

    constructor(
        @InjectRepository(Propuesta)
        private propuestaRepository: Repository<Propuesta>
    ){}

    generarPDF(){
        let doc = new PDFDocument;
        let evidencia = fs.createWriteStream(this.originalname);
        doc.pipe(fs.createWriteStream('./output.pdf'));
        doc.text('Hello ', {
            lineBreak : true,
            lineGap: 30,
        }).font('Times-Roman').text('World!');
        doc.image(this.path, {
            fit: [250, 300],
            align: 'center',
            valign: 'center'
          });
        doc.end();
    }

    async guardarPropuesta(nuevaPropuesta: Propuestadto): Promise<Propuesta>{
        const newPropuesta = new Propuesta();

        let d4 = moment().format('MMM Do YY')

        newPropuesta.nombre = nuevaPropuesta.nombre;
        newPropuesta.telefono = nuevaPropuesta.telefono;
        newPropuesta.correo = nuevaPropuesta.correo;
        newPropuesta.codigoPostal = nuevaPropuesta.codigoPosta;
        newPropuesta.colonia = nuevaPropuesta.colonia;
        newPropuesta.problema = nuevaPropuesta.problema;
        newPropuesta.propuesta = nuevaPropuesta.propuesta;
        newPropuesta.fecha = d4;
        newPropuesta.anexos = this.path;
        newPropuesta.activa = false;

        return await this.propuestaRepository.save(newPropuesta);
    }

    pathFile(files: File){
        console.log(files[0]);
        this.path = files[0].path;
        this.originalname = files[0].originalname;
        
    }
}
