import { Module } from '@nestjs/common';
import { AfiliacionController } from './afiliacion.controller';
import { AfiliacionService } from './afiliacion.service';

@Module({
  controllers: [AfiliacionController],
  providers: [AfiliacionService]
})
export class AfiliacionModule {}
