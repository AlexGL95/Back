import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReporteCiudadanoController } from './reporte-ciudadano.controller';
import { ReporteCiudadanoService } from './reporte-ciudadano.service';
import { reporteCiudadano } from './reporte-ciudadano.entity';
import { Categoria } from 'src/categoria/categoria.entity';
import { AreaRC } from 'src/Categoria/Areas/areaRC.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ reporteCiudadano, Categoria, AreaRC ])],
  controllers: [ReporteCiudadanoController],
  providers: [ReporteCiudadanoService]
})
export class ReporteCiudadanoModule {}
