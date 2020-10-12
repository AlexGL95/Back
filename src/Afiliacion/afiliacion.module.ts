import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AfiliacionController } from './afiliacion.controller';
import { AfiliacionService } from './afiliacion.service';
import { Afilicion } from './afiliacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Afilicion ])],
  controllers: [AfiliacionController],
  providers: [AfiliacionService]
})
export class AfiliacionModule {}
