import { Body, Controller, Get, Res, Post, UseInterceptors, UploadedFiles, HttpStatus, Param } from '@nestjs/common';
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

    @Post()
    guardarQueja(@Body() quejadto: createquejadto, @Res() response){
        this.quejaService.createqueja(quejadto).then(quejam => {
            response.status(HttpStatus.CREATED).json(quejam);
        });
    }

    @Post('/filesQ')
    @UseInterceptors(AnyFilesInterceptor({
        storage: diskStorage({
          destination: './files/quejas',
        }),
        limits: {fileSize: 300000}
      }))
    uploadFile(@UploadedFiles() files) {
      return this.quejaService.pathFile(files);
    }

    //Endpoint obtenerRC.
    @Get(':categoria/:areaQ/:pagina')
    obtenerQueja( @Param('categoria') categoria: number, @Param('areaQ') area: number, @Param('pagina') pagina: number ): Promise<{ rcArr: Queja[], nSig: number }> {
        return this.quejaService.obtenerQueja( categoria, area, pagina);
    }

}

