import { Controller, Post, Body, Res, HttpStatus, UseInterceptors, UploadedFiles, Get } from '@nestjs/common';
import { Propuestadto } from './dto/crearPropuesta.dto';
import { response } from 'express';
import { diskStorage } from 'multer'
import { PropuestaService } from './propuesta.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { QuejaService } from 'src/Queja/queja.service';

@Controller('propuesta')
export class PropuestaController {

    constructor(
        private propuestaService: PropuestaService,
    ){}

    @Get()
    generarPDF() {
        return this.propuestaService.generarPDF();
    }

    @Post()
    guardarPropuesta(@Body() propuestadto: Propuestadto, @Res() response){
        this.propuestaService.guardarPropuesta(propuestadto).then(propuestam => {
            response.status(HttpStatus.CREATED).json(propuestam);
        });
    }

    @Post('/files')
    @UseInterceptors(AnyFilesInterceptor({
        storage: diskStorage({
          destination: './files',
        }),
        limits: {fileSize: 300000}
      }))
    uploadFile(@UploadedFiles() files) {
      return this.propuestaService.pathFile(files);
    }

}
