import { Injectable } from '@nestjs/common';
import PDFDocument = require('pdfkit');
import fs = require('fs');

@Injectable()
export class QuejaService {

    constructor(
        
    ){

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
