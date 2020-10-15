import { Controller, Post, Body, Get, Param, UseInterceptors, UploadedFiles, Res, HttpStatus } from '@nestjs/common';
import { ReporteCiudadanoDTO } from './dto/reporte-ciudadano.dto';
import { ReporteCiudadanoService } from './reporte-ciudadano.service';
import { reporteCiudadano } from './reporte-ciudadano.entity';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { response } from 'express';

@Controller('rc')
export class ReporteCiudadanoController {

    constructor(private reporteCiudadanoService: ReporteCiudadanoService) {}

    // Endpoint guardarRC.
    @Post()
    guardarRC( @Body() body: ReporteCiudadanoDTO, @Res() res ) {
        this.reporteCiudadanoService.guardarRC(body)
          .then( folio => {
            res.status(HttpStatus.CREATED).json(folio)
          }).catch((err)=>{
            res.status(HttpStatus.CONFLICT).json(err);
          });
    }

    @Post('/filesRC')
    @UseInterceptors(AnyFilesInterceptor({
        storage: diskStorage({
          destination: './files/reportes',
        }),
        limits: {fileSize: 300000}
      }))
    uploadFile(@UploadedFiles() files) {
      return this.reporteCiudadanoService.pathFile(files);
    }

    //Endpoint obtenerRC.
    @Get(':categoria/:areaRC/:pagina')
    obtenerRC( @Res() res, @Param('categoria') categoria: number, @Param('areaRC') area: number, @Param('pagina') pagina: number ) {
        this.reporteCiudadanoService.obtenerRC( categoria, area, pagina)
          .then( pagina => {
            res.status(HttpStatus.CREATED).json(pagina)
          }).catch((err)=>{
            res.status(HttpStatus.CONFLICT).json(err);
          });
    }

    //Endpoint obtenerRcGraph.
    @Get('graph/:categoria/:areaRC/:fechaIni/:fechaFin')
    obtenerRcGraph( @Res() res, @Param('categoria') categoria: number, @Param('areaRC') area: number, @Param('fechaIni') fechaIni: string, @Param('fechaFin') fechaFin: string ) {
        this.reporteCiudadanoService.obtenerRcGraph(categoria, area, fechaIni, fechaFin)
          .then( arr => {
            res.status(HttpStatus.CREATED).json(arr)
          }).catch((err)=>{
            res.status(HttpStatus.CONFLICT).json(err);
          });
    }

}
