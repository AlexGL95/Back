import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
var moment = require('moment');
import { reporteCiudadano } from './reporte-ciudadano.entity';
import { ReporteCiudadanoDTO } from './dto/reporte-ciudadano.dto';
import { ReporteCiudadanoInterface } from "./interface/ReporteCiudadanoInterface.interface";
import { CategoriaService } from 'src/categoria/categoria.service';


@Injectable()
export class ReporteCiudadanoService {

    constructor(
        @InjectRepository(reporteCiudadano)
        private userRepository: Repository<reporteCiudadano>,
        private categoriaService: CategoriaService
    ) {}

    // Metodo para generar un nuevo reporte ciudadadano y guardarlo en DB.
    async guardarRC( body: ReporteCiudadanoDTO ): Promise<string> {

        let folio = 'folio';
        let categoriasArr = await this.categoriaService.obtenerCategoria();
        let areasArr = await this.categoriaService.obtenerAreasRC();
        let nuevoRC: ReporteCiudadanoInterface = {
            nombre: "",
            telefono: "",
            correo: "",
            codigoPostal: body.cp,
            colonia: body.colonia,
            categoria: categoriasArr[body.categoria],
            area: areasArr[body.area],
            reporte: body.reporte,
            anexos: "",
            fecha: moment().format("MMM Do YY"),
            folio: folio,
            activa: false,
            afiliacion: false
        };
        if (body.nombre) {
            nuevoRC.nombre = body.nombre;
        }
        if (body.telefono) {
            nuevoRC.telefono = body.telefono;
        }
        if (body.correo) {
            nuevoRC.correo = body.correo;
        }
        console.log(nuevoRC);
        await this.userRepository.save(nuevoRC);
        return folio;

    };

}
