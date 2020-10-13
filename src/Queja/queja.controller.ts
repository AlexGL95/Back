import { Controller, Get, Res, Post, UseInterceptors, UploadedFiles, HttpStatus } from '@nestjs/common';
import { QuejaService } from './queja.service';
import { diskStorage } from 'multer'
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { createquejadto } from './Dto/queja.dto';

@Controller('queja')
export class QuejaController {

    constructor(
        private quejaservice: QuejaService
    ){}

    @Post()
    create(@Res() res, @Body() createqueja: createquejadto){
        this.quejaservice.createqueja(createqueja).then( queja => {
            res.status(HttpStatus.CREATED).json(queja)
        }).catch(()=>{
            res.status(HttpStatus.CONFLICT).json({mensaje:'Error en la creacion de la queja'});
        });
    }
}

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
