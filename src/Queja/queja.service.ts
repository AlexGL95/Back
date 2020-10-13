import { Injectable } from '@nestjs/common';
import PDFDocument = require('pdfkit');
import fs = require('fs');
import { InjectRepository } from '@nestjs/typeorm';
import { Queja } from 'src/Queja/queja.entity';
import { Repository } from 'typeorm';
import { createquejadto } from './Dto/queja.dto';

@Injectable()
export class QuejaService {

    constructor(
        @InjectRepository(Queja)
        private quejarepository : Repository<Queja>,
    ){}

    // Creacion de quejas
    async createqueja(newqueja: createquejadto){
        console.log('Se quejo');
        let queja = new Queja;
        queja.id=0;
        queja.nombre = newqueja.nombre;
        queja.telefono = newqueja.telefono;
        queja.correo = newqueja.correo;
        queja.codigoPostal = newqueja.cp;
        queja.colonia = newqueja.colonia;
        queja.queja = newqueja.queja;
        queja.evidencia=':D';
        queja.fecha= ':D';
        queja.folio=':D';
        queja.activa = true;
        queja.afiliacion = false;
        console.log(queja);
        return await this.quejarepository.save(queja);

    }
}

    constructor(){

    }

    generarPDF(){
        let doc = new PDFDocument;
        doc.pipe(fs.createWriteStream('./output.pdf'));
        doc.text('Hello ', {
            lineBreak : true,
            lineGap: 30,
        }).font('Times-Roman').text('World!');
        doc.end();
    }

    pathFile(files: File){
        console.log(files[0].path);
    }
}
