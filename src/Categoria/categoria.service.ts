import { Injectable } from '@nestjs/common';
import { Categoria } from './categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaQuejas } from './Areas/areaQuejas.entity';
import { AreaRC } from './Areas/areaRC.entity';
import { AreaPropuestas } from './Areas/areaPropuestas.entity';
import { strict } from 'assert';

@Injectable()
export class CategoriaService {

    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
        @InjectRepository(AreaQuejas)
        private areaQRepository: Repository<AreaQuejas>,
        @InjectRepository(AreaPropuestas)
        private areaPRepository: Repository<AreaPropuestas>,
        @InjectRepository(AreaRC)
        private areaRCRepository: Repository<AreaRC>,
    ) {}

    async obtenerCategoria(): Promise<Categoria[]> {
        return await this.categoriaRepository.find();
    }

    async obtenerAreasQ(): Promise<AreaQuejas[]> {
        return await this.areaQRepository.find();
    }

    async obtenerAreasP(): Promise<AreaPropuestas[]> {
        return await this.areaPRepository.find();
    }

    async obtenerAreasRC(): Promise<AreaRC[]> {
        return await this.areaRCRepository.find();
    }

    async crearCategoria(): Promise<Categoria> {
        const newCategoria = new Categoria();
        newCategoria.tipo = 'Protección Civil';
        return await this.categoriaRepository.save(newCategoria);
    }

    async crearAreasQyP(): Promise<AreaQuejas> {
        const newAreasQ = new AreaQuejas();
        const area = 'Vía Peatonal'
        newAreasQ.area = area;
        const newAreasP = new AreaPropuestas();
        newAreasP.area = area;
        await this.areaPRepository.save(newAreasP);
        return await this.areaQRepository.save(newAreasQ);
    }

    async crearAreasRC(): Promise<AreaRC> {
        const newAreasRC = new AreaRC();
        newAreasRC.area = 'Inundaciones';
        return await this.areaRCRepository.save(newAreasRC);
    }

}
