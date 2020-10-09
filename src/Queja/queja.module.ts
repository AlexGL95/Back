import { Module } from '@nestjs/common';
import { QuejaController } from './queja.controller';
import { QuejaService } from './queja.service';

@Module({
  controllers: [QuejaController],
  providers: [QuejaService]
})
export class QuejaModule {}
