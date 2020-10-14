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

    //Endpoint obtenerRC.
    @Get(':categoria/:areaQ/:pagina')
    obtenerQueja( @Param('categoria') categoria: number, @Param('areaQ') area: number, @Param('pagina') pagina: number ): Promise<{ rcArr: Queja[], nSig: number }> {
        return this.quejaService.obtenerQueja( categoria, area, pagina);
    }

}

