import { Controller, Get, Res, Post, UseInterceptors, UploadedFiles, HttpStatus } from '@nestjs/common';
import { QuejaService } from './queja.service';
import { diskStorage } from 'multer'
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('queja')
export class QuejaController {

    constructor(private quejaService: QuejaService) {}

    @Get()
    generarPDF() {
        return this.quejaService.generarPDF();
    }

    @Post()
    @UseInterceptors(AnyFilesInterceptor({
        storage: diskStorage({
          destination: './files',
        }),
        limits: {fileSize: 30000}
      }))
    uploadFile(@UploadedFiles() files) {
      return this.quejaService.pathFile(files);
    }
}
