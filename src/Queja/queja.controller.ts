import { Body, Controller, Get, Res, Post, UseInterceptors, UploadedFiles, HttpStatus } from '@nestjs/common';
import { QuejaService } from './queja.service';
import { diskStorage } from 'multer'
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { createquejadto } from './Dto/queja.dto';
import { Queja } from './queja.entity';

@Controller('queja')
export class QuejaController {

    constructor(
        private quejaService: QuejaService
    ){}

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

    //Endpoint obtenerRC.
    @Get(':categoria/:areaQ/:pagina')
    obtenerQueja( @Param('categoria') categoria: number, @Param('areaQ') area: number, @Param('pagina') pagina: number ): Promise<{ rcArr: Queja[], nSig: number }> {
        return this.quejaservice.obtenerQueja( categoria, area, pagina);
    }

}

