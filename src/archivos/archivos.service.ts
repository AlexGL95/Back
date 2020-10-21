import { Injectable } from '@nestjs/common';
var moment = require('moment');
var nodemailer = require('nodemailer');
import { Moment } from "moment";
import PDFDocument = require('pdfkit');
import fs = require('fs');

@Injectable()
export class ArchivosService {

    // Metodo para generacion de folios. Necesita el tipo (Q,P,RC), la fecha y el id en base de datos.
    generarFolio( tipo: string, fecha: string, id: number ) {
        let folio: string;
        let nRandom = Math.floor(Math.random() * (999 - 0)) + 0;
        if ( (tipo==='Q') || (tipo==='P') || (tipo==='RC') ) {
            let fechaTemp = moment(fecha, "MMM Do YY").format('D/M/YY');
            let codigo = (id * nRandom).toString(10);
            folio = tipo + fechaTemp + codigo.substr( (codigo.length - 4), 4 );
            folio = folio.replace('/','');
            folio = folio.replace('/','');
            return folio;
        }
        else {
            let error = new Error;
            error.name = 'T-Algo';
            error.message = 'El tipo enviado no existe.';
            throw error;
        }
    }

    // Genera PDF para Propuestas
    generarPDFP(nombre: string, telefono: string, correo: string, codigo: string, colonia: string, problema: string, propuesta: string, categoria: string, area: string, path: string, folio: string){
        const aparece = false;
        let doc = new PDFDocument;
        const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        doc.pipe(fs.createWriteStream(`./pdfs/propuestas/propuesta${folio}.pdf`));
        doc.fillColor([63, 17, 33]).font('Helvetica-Bold').text(`Folio: ${folio}`, {
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
            link: `http://localhost:4200/Propuesta/ver/${folio}`,
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
    generarPDFQ(nombre: string, telefono: string, correo: string, codigo: string, colonia: string, queja: string, categoria: string, area: string, path: string, folio: string){
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

        doc.pipe(fs.createWriteStream(`./pdfs/quejas/queja${folio}.pdf`));
        doc.fillColor([63, 17, 33]).font('Helvetica-Bold').text(`Folio: ${folio}`, {
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
            link: `http://localhost:4200/Queja/ver/${folio}`,
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

    generarPDFRC(nombre: string, telefono: string, correo: string, codigo: string, colonia: string, problema: string, categoria: string, area: string, path: string, folio: string){
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

        doc.pipe(fs.createWriteStream(`./pdfs/reportes/reporte${folio}.pdf`));
        doc.fillColor([ 63, 17, 33]).font('Helvetica-Bold').text(`Folio: ${folio}`, {
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
            link: `http://localhost:4200/Reporte/ver/${folio}`,
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

    // Metodo para enviar un correo al emisor.
    async enviarCorreo( correo: string, folio: string, pdfPath: string ) {

        // Configuracion del transporter.
        const transporter = nodemailer.createTransport({
            // ----- Para desarrollo ----- //
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'allison.mann95@ethereal.email',
                pass: 'xDKKnwcsKbdmuZPGmp'
            }
            // ----- Para pruebas de produccion ----- //
            /*service: 'Gmail',
            auth: {
                user: 'innmortalmailservice@gmail.com',
                pass: 'Innmortal1234'
            }*/
            // ----- Para produccion ----- //
            /*service: 'Gmail',
            auth: {
                user: 'ejenplo@gmail.com',
                pass: 'password'
            }*/
        });

        // Creacion del mensaje
        const mensaje = {
            from: '"Escucha',
            to: correo,
            subject: 'Atencion de Quejas, Propuestas y Reportes ciudadanos.',
            text:   'El trámite referente a la atención de tu queja, sugerencia y/o reporte ciudadano, en adelante será recibida conforme a la normatividad establecida, con el fin de darte a conocer la respuesta y/o comentario de la atención brindada.\n\n' +
                    'Con la finalidad de que tu queja, propuesta o reporte sea atendida, a continuacion adjuntamos el reporte generado de la misma.',
            attachments: [ {
                filename: 'Reporte' + folio + '.pdf',
                path: pdfPath,
                contentType: 'application/pdf'
            } ],
        };

        // Envio del correo.
        await transporter.sendMail( mensaje, error => {
            if(error) {
                console.log(error);
            }
        } );

    }

}
