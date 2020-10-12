import { Controller, Get, Res, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
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
        })
      }))
    uploadFile(@UploadedFiles() files) {
    console.log(files);
}
}
