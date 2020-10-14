import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaController } from './propuesta.controller';
import { PropuestaService } from './propuesta.service';
import { Propuesta } from 'src/Propuesta/propuesta.entity';
import { Categoria } from 'src/Categoria/categoria.entity';
import { AreaPropuestas } from 'src/Categoria/Areas/areaPropuestas.entity';
import { CategoriaService } from 'src/Categoria/categoria.service';
import { AreaQuejas } from 'src/Categoria/Areas/areaQuejas.entity';
import { AreaRC } from 'src/Categoria/Areas/areaRC.entity';
import { ArchivoService } from 'src/archivo/archivo.service';

@Module({
  imports: [TypeOrmModule.forFeature([ Propuesta, Categoria, AreaQuejas, AreaPropuestas, AreaRC ])],
  controllers: [PropuestaController],
  providers: [PropuestaService, CategoriaService, ArchivoService]
})
export class PropuestaModule {}
