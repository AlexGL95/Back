import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaController } from './propuesta.controller';
import { PropuestaService } from './propuesta.service';
import { Propuesta } from 'src/Propuesta/propuesta.entity';
import { Categoria } from 'src/categoria/categoria.entity';
import { AreaPropuestas } from 'src/Categoria/Areas/areaPropuestas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Propuesta, Categoria, AreaPropuestas ])],
  controllers: [PropuestaController],
  providers: [PropuestaService]
})
export class PropuestaModule {}
