import { Injectable } from '@nestjs/common';
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
        return await this.quejarepository.save(queja);
    }
}
