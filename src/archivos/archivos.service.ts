import { Injectable } from '@nestjs/common';
var moment = require('moment');
var nodemailer = require('nodemailer');

@Injectable()
export class ArchivosService {

    // Metodo para generacion de folios. Necesita el tipo (Q,P,RC), la fecha y el id en base de datos.
    generarFolio( tipo: string, fecha: string, id: number ) {
        let folio: string;
        if ( (tipo==='Q') || (tipo==='P') || (tipo==='RC') ) {
            let fechaTemp = moment(fecha, "MMM Do YY").format('L');
            let codigo = (id * 73).toString(10);
            folio = tipo + fechaTemp.substr( 0, (fechaTemp.length - 2) ) + codigo.substr( (codigo.length - 4), 4 );
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

    // Metodo para enviar un correo al emisor.
    async enviarCorreo( correo: string, evidencia: string ) {

        // Para produccion //
        /*
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'example@gmail.com',
                pass: 'password'
            }
        } );
        */
       // ---------------- //

        // Para desarrollo //
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'creola.daugherty@ethereal.email',
                pass: 'wHXkVYpQRpdFwBWSv3'
            }
        });
        // ---------------- //

        const mensaje = {
            from: '"Escucha',
            to: correo,
            subject: 'Atencion de Quejas, Propuestas y Reportes ciudadanos.',
            text:   'El trámite referente a la atención de tu queja, sugerencia y/o reporte ciudadano, en adelante será recibida conforme a la normatividad establecida, con el fin de darte a conocer la respuesta y/o comentario de la atención brindada.\n\n' +
                    'Con la finalidad de que tu queja, propuesta o reporte sea atendida, a continuacion adjuntamos el reporte generado de la misma.'
        };
        await transporter.sendMail( mensaje, error => {
            if(error) {
                console.log(error);
            }
        } );

    }

}
