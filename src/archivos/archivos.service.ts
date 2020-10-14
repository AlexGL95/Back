import { Injectable } from '@nestjs/common';
var moment = require('moment');
import { Moment } from "moment";

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

}
