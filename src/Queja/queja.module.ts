import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuejaController } from './queja.controller';
import { QuejaService } from './queja.service';
import { Queja } from './queja.entity';
import { Categoria } from 'src/Categoria/categoria.entity';
import { AreaQuejas } from 'src/Categoria/Areas/areaQuejas.entity';
import { CategoriaService } from 'src/Categoria/categoria.service';
import { AreaPropuestas } from 'src/Categoria/Areas/areaPropuestas.entity';
import { AreaRC } from 'src/Categoria/Areas/areaRC.entity';
import { ArchivoService } from 'src/archivo/archivo.service';

@Module({
  imports: [TypeOrmModule.forFeature([ Queja, Categoria, AreaQuejas, AreaPropuestas, AreaRC ])],
  controllers: [QuejaController],
  providers: [QuejaService, CategoriaService, ArchivoService]
})
export class QuejaModule {}
