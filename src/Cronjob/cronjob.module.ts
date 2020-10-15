import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronjobService } from './cronjob.service';

@Module({
  imports:[ TypeOrmModule.forFeature([
    
  ])],
  providers: [CronjobService]
})
export class CronjobModule {}
