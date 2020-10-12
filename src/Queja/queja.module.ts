import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuejaController } from './queja.controller';
import { QuejaService } from './queja.service';
import { Queja } from './queja.entity';
import { Categoria } from 'src/categoria/categoria.entity';
import { AreaQuejas } from 'src/Categoria/Areas/areaQuejas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Queja, Categoria, AreaQuejas ])],
  controllers: [QuejaController],
  providers: [QuejaService]
})
export class QuejaModule {}
