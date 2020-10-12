import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { Categoria } from 'src/Categoria/categoria.entity';
import { AreaQuejas } from 'src/Categoria/Areas/areaQuejas.entity';
import { AreaPropuestas } from 'src/Categoria/Areas/areaPropuestas.entity';
import { AreaRC } from './Areas/areaRC.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Categoria, AreaQuejas, AreaPropuestas, AreaRC ])],
  controllers: [CategoriaController],
  providers: [CategoriaService]
})
export class CategoriaModule {}
