import { Module } from '@nestjs/common';
import { ArchivosService } from './archivos.service';

@Module({
  providers: [ArchivosService]
})
export class ArchivosModule {}
