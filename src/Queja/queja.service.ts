import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queja } from 'src/Queja/queja.entity';
import { Repository } from 'typeorm';
import { createquejadto } from './Dto/queja.dto';
import { CategoriaService } from 'src/categoria/categoria.service';
import PDFDocument = require('pdfkit');
import fs = require('fs');

@Injectable()
export class QuejaService {

    constructor(
        @InjectRepository(Queja)
        private quejaRepository : Repository<Queja>,
        private categoriaService: CategoriaService
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
        return await this.quejaRepository.save(queja);

    generarPDF(){
        let doc = new PDFDocument;
        doc.pipe(fs.createWriteStream('./output.pdf'));
        doc.text('Hello ', {
            lineBreak : true,
            lineGap: 30,
        }).font('Times-Roman').text('World!');
        doc.end();
    }

        // Metodo para leer una pagina de reportes ciudadadanos.
        async obtenerQueja( categoria: number, area: number, pagina: number ): Promise<{ rcArr: Queja[], nSig: number }> {
            // Declaracion de variables y constantes.
            const skip = (pagina-1) * 10;
            let rcArr: Queja[] = [];
            // Si no tiene categoria ni area = retorna cualquier paginacion disponible.
            if( (categoria == 0) && (area == 0) ) {
                rcArr = await this.quejaRepository.find( {  skip: skip, take: 50 } );
            }
            // Si no tiene area pero si categoria = retorna la paginacion correspondiente a la categoria.
            else if( (categoria != 0) && (area == 0) ) {
                const categoriasArr = await this.categoriaService.obtenerCategoria();
                rcArr = await this.quejaRepository.find( { where: { categoria: categoriasArr[categoria - 1] }, skip: skip, take: 50 } );
            }
            // Si tiene area y categoria = retorna la paginacion correspondiente al area de la categoria.
            else if( (categoria != 0) && (area != 0) ) {
                const categoriasArr = await this.categoriaService.obtenerCategoria();
                const areasArr = await this.categoriaService.obtenerAreasQ();
                rcArr = await this.quejaRepository.find( { where: { categoria: categoriasArr[categoria - 1], area: areasArr[area - 1] }, skip: skip, take: 50 } );
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
