import { Body, Controller, Get, Res, Post, UseInterceptors, UploadedFiles, HttpStatus, Param, HttpCode, Header } from '@nestjs/common';
import { QuejaService } from './queja.service';
import { diskStorage } from 'multer'
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { createquejadto } from './Dto/queja.dto';
import { Queja } from './queja.entity';
import fs = require('fs');

@Controller('queja')
export class QuejaController {

    constructor(
        private quejaService: QuejaService
    ){}

    @Post()
    create(@Res() res, @Body() createqueja: createquejadto){
        this.quejaService.createqueja(createqueja)
          .then( folio => {
            res.status(HttpStatus.CREATED).json(folio)
          }).catch((err)=>{
            res.status(HttpStatus.CONFLICT).json(err);
          });
    }

    //Endpoint obtenerQueja.
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
    obtenerQueja( @Res() res, @Param('categoria') categoria: number, @Param('areaQ') area: number, @Param('pagina') pagina: number ) {
        this.quejaService.obtenerQueja( categoria, area, pagina)
          .then( pagina => {
            res.status(HttpStatus.CREATED).json(pagina)
          }).catch((err)=>{
            res.status(HttpStatus.CONFLICT).json(err);
          });
    }

    //Endpoint obtenerQuejaGraph.
    @Get('graph/:categoria/:areaQ/:fechaIni/:fechaFin')
    obtenerQuejaGraph( @Res() res, @Param('categoria') categoria: number, @Param('areaQ') area: number, @Param('fechaIni') fechaIni: string, @Param('fechaFin') fechaFin: string ) {
        this.quejaService.obtenerQuejaGraph(categoria, area, fechaIni, fechaFin)
          .then( arr => {
            res.status(HttpStatus.CREATED).json(arr)
          }).catch((err)=>{
            res.status(HttpStatus.CONFLICT).json(err);
          });
    }

    @Get()
    obtenerQuejas(@Res() response){
      return this.quejaService.obtenerQuejas().then(obtenerPropuestas => {
        response.status(HttpStatus.OK).json(obtenerPropuestas);
      }).catch(err => {
        response.status(HttpStatus.CONFLICT).json(err)
      });
    }

    //Endpoint verQueja.
    @Get('/:id')
    @Header('Content-Type', 'application/pdf')
    @Header('Content-Disposition', 'attachment; filename=queja.pdf')
    verQueja( @Param('id') id, @Res() response ) {
        this.quejaService.verQueja( id ).then( verm => {
          return fs.createReadStream( verm ).pipe(response);
        }).catch( err =>{
             response.status(HttpStatus.CONFLICT).json(err);
        } );
    }

}
