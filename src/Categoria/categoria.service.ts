import { Injectable } from '@nestjs/common';
import { Categoria } from './categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaQuejas } from './Areas/areaQuejas.entity';
import { AreaRC } from './Areas/areaRC.entity';
import { AreaPropuestas } from './Areas/areaPropuestas.entity';

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

}
