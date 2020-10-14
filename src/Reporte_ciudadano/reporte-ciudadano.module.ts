import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReporteCiudadanoController } from './reporte-ciudadano.controller';
import { ReporteCiudadanoService } from './reporte-ciudadano.service';
import { reporteCiudadano } from './reporte-ciudadano.entity';
import { Categoria } from 'src/Categoria/categoria.entity';
import { AreaRC } from 'src/Categoria/Areas/areaRC.entity';
import { CategoriaService } from 'src/Categoria/categoria.service';
import { AreaPropuestas } from 'src/Categoria/Areas/areaPropuestas.entity';
import { AreaQuejas } from 'src/Categoria/Areas/areaQuejas.entity';
import { ArchivosService } from 'src/archivos/archivos.service';

@Module({
  imports: [TypeOrmModule.forFeature([ reporteCiudadano, Categoria, AreaQuejas, AreaPropuestas, AreaRC ])],
  controllers: [ReporteCiudadanoController],
  providers: [ReporteCiudadanoService, CategoriaService, ArchivosService]
})
export class ReporteCiudadanoModule {}
