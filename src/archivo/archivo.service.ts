import { Injectable } from '@nestjs/common';
import PDFDocument = require('pdfkit');
import fs = require('fs');

@Injectable()
export class ArchivoService {

    // Genera PDF para Propuestas
    generarPDFP(nombre: string, telefono: string, correo: string, codigo: string, colonia: string, problema: string, propuesta: string, categoria: string, area: string, path: string){
        const aparece = false;
        let doc = new PDFDocument;
        const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        doc.pipe(fs.createWriteStream('./pdfs/propuestas/propuesta.pdf'));
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
        }).font('Helvetica').text(`${categoria}-${area}`, {
            lineBreak : true,
            lineGap: 25,
        }).font('Helvetica-Bold').text('PROBLEMA', {
            lineBreak : true,
            lineGap: 10,
        }).font('Helvetica').text(problema, {
            lineBreak : true,
            lineGap: 5,
            align: 'justify',
        });
        doc.moveDown();
        doc.font('Helvetica-Bold').text('PROPUESTA', {
            lineBreak : true,
            lineGap: 10,
        }).font('Helvetica').text(propuesta, {
            lineBreak : true,
            lineGap: 5,
            align: 'justify',
        });
        doc.moveDown();
        if(path !== ''){
            doc.font('Helvetica-Bold').text('ADJUNTO', {
                lineBreak : true,
                lineGap: 10,
            });
            doc.font('Helvetica')
            .fillColor('red')
            .text('Evidencia', {
            link: 'http://apple.com/',
            underline: true
        });
        }
        doc.fillColor('black').font('Helvetica-Bold').text('CORREO ELECTRÓNICO', 350, 173, {
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

    //Genera Propuestas para Quejas
    generarPDFQ(nombre: string, telefono: string, correo: string, codigo: string, colonia: string, queja: string, categoria: string, area: string, path: string){
        const aparece = false;
        let doc = new PDFDocument;
        const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        let nombreI = '';
        let telefonoI = '';
        let correoI = '';

        if(nombre === ''){
            nombreI = 'Anónimo';
        }else{
            nombreI = nombre;
        }

        if(telefono === ''){
            telefonoI = 'Anónimo';
        }else{
            telefonoI = telefono;
        }

        if(correo === ''){
            correoI = 'Anónimo';
        }else{
            correoI = correo;
        }

        doc.pipe(fs.createWriteStream('./pdfs/quejas/queja.pdf'));
        doc.fillColor('red').font('Helvetica-Bold').text('Folio', {
            lineBreak : true,
            lineGap: 25,
        }).fillColor('black').font('Helvetica-Bold').text('NOMBRE COMPLETO ', {
            lineBreak : true,
            lineGap: 10,
        }).font('Helvetica').text(nombreI, {
            lineBreak : true,
            lineGap: 25,
        }).font('Helvetica-Bold').text('TELÉFONO', {
            lineBreak : true,
            lineGap: 10,
        }).font('Helvetica').text(telefonoI, {
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
        }).font('Helvetica').text(`${categoria}-${area}`, {
            lineBreak : true,
            lineGap: 25,
        }).font('Helvetica-Bold').text('ESCRIBE TU QUEJA: ', {
            lineBreak : true,
            lineGap: 10,
        }).font('Helvetica').text(queja, {
            lineBreak : true,
            lineGap: 5,
            align: 'justify',
        });
        doc.moveDown();
        if(path !== ''){
            doc.font('Helvetica-Bold').text('ADJUNTO', {
                lineBreak : true,
                lineGap: 10,
            });
            doc.font('Helvetica')
            .fillColor('red')
            .text('Evidencia', {
            link: 'http://apple.com/',
            underline: true
        });
        }
        doc.fillColor('black').font('Helvetica-Bold').text('CORREO ELECTRÓNICO', 350, 173, {
            lineBreak : true,
            lineGap: 10,
        }).font('Helvetica').text(correoI, {
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

    generarPDFRC(nombre: string, telefono: string, correo: string, codigo: string, colonia: string, problema: string, categoria: string, area: string, path: string){
        const aparece = false;
        let doc = new PDFDocument;
        const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        
        let nombreI = '';
        let telefonoI = '';
        let correoI = '';

        if(nombre === ''){
            nombreI = 'Anónimo';
        }else{
            nombreI = nombre;
        }

        if(telefono === ''){
            telefonoI = 'Anónimo';
        }else{
            telefonoI = telefono;
        }

        if(correo === ''){
            correoI = 'Anónimo';
        }else{
            correoI = correo;
        }

        doc.pipe(fs.createWriteStream('./pdfs/reportes/reporte.pdf'));
        doc.fillColor('red').font('Helvetica-Bold').text('Folio', {
            lineBreak : true,
            lineGap: 25,
        }).fillColor('black').font('Helvetica-Bold').text('NOMBRE COMPLETO ', {
            lineBreak : true,
            lineGap: 10,
        }).font('Helvetica').text(nombreI, {
            lineBreak : true,
            lineGap: 25,
        }).font('Helvetica-Bold').text('TELÉFONO', {
            lineBreak : true,
            lineGap: 10,
        }).font('Helvetica').text(telefonoI, {
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
        }).font('Helvetica').text(`${categoria}-${area}`, {
            lineBreak : true,
            lineGap: 25,
        }).font('Helvetica-Bold').text('REPORTE', {
            lineBreak : true,
            lineGap: 10,
        }).font('Helvetica').text(problema, {
            lineBreak : true,
            lineGap: 5,
            align: 'justify',
        });
        doc.moveDown();
        if(path !== ''){
            doc.font('Helvetica-Bold').text('ADJUNTO', {
                lineBreak : true,
                lineGap: 10,
            });
            doc.font('Helvetica')
            .fillColor('red')
            .text('Evidencia', {
            link: 'http://apple.com/',
            underline: true
        });
        }
        doc.fillColor('black').font('Helvetica-Bold').text('CORREO ELECTRÓNICO', 350, 173, {
            lineBreak : true,
            lineGap: 10,
        }).font('Helvetica').text(correoI, {
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

}
