import { Controller, Post, Body, Res, HttpStatus, UseInterceptors, UploadedFiles, Get, Delete, Param, Header } from '@nestjs/common';
import { Propuestadto } from './dto/crearPropuesta.dto';
import { diskStorage } from 'multer'
import { PropuestaService } from './propuesta.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import fs = require('fs');

@Controller('propuesta')
export class PropuestaController {

    constructor(
        private propuestaService: PropuestaService,
        private reporteCiudadanoService: PropuestaService,
    ){}

    @Post()
    guardarPropuesta(@Body() propuestadto: Propuestadto, @Res() res){
        this.propuestaService.guardarPropuesta(propuestadto)
          .then( folio => {
            res.status(HttpStatus.CREATED).json(folio)
          }).catch((err)=>{
            res.status(HttpStatus.CONFLICT).json(err);
          });
    }

    @Post('/filesP')
    @UseInterceptors(AnyFilesInterceptor({
        storage: diskStorage({
          destination: './files/propuestas',
        }),
        limits: {fileSize: 300000}
      }))
    uploadFile(@UploadedFiles() files) {
      return this.propuestaService.pathFile(files);
    }

    @Get()
    obtenerPropuestas(@Res() response){
      return this.propuestaService.obtenerPropuestas().then(obtenerPropuestas => {
        response.status(HttpStatus.OK).json(obtenerPropuestas);
      }).catch(err => {
        response.status(HttpStatus.CONFLICT).json(err)
      });
    }

    @Delete(':id')
    delete( @Param('id') id, @Res() response ) {
        this.propuestaService.borrarPropuesta( id ).then( () => {
            response.status(HttpStatus.OK).json( {Mensaje:`User ${id} eliminated.`} );
        }).catch( err =>{
             response.status(HttpStatus.CONFLICT).json(err);
        } );
    }

    //Endpoint obtenerPropuestas.
    @Get(':categoria/:areaP/:pagina')
    obtenerPropuesta( @Res() res, @Param('categoria') categoria: number, @Param('areaP') area: number, @Param('pagina') pagina: number ) {
        this.reporteCiudadanoService.obtenerPropuesta( categoria, area, pagina)
          .then( pagina => {
            res.status(HttpStatus.CREATED).json(pagina)
          }).catch((err)=>{
            res.status(HttpStatus.CONFLICT).json(err);
          });
    }

    //Endpoint obtenerPropuestaGraph.
    @Get('graph/:categoria/:areaP/:fechaIni/:fechaFin')
    obtenerPropuestaGraph( @Res() res, @Param('categoria') categoria: number, @Param('areaP') area: number, @Param('fechaIni') fechaIni: string, @Param('fechaFin') fechaFin: string ) {
        this.reporteCiudadanoService.obtenerPropuestaGraph(categoria, area, fechaIni, fechaFin)
          .then( arr => {
            res.status(HttpStatus.CREATED).json(arr)
          }).catch((err)=>{
            res.status(HttpStatus.CONFLICT).json(err);
          });
    }

    //Endpoint verPropuesta.
    @Get('/:id')
    @Header('Content-Type', 'application/pdf')
    @Header('Content-Disposition', 'attachment; filename=queja.pdf')
    verQueja( @Param('id') id, @Res() response ) {
        this.propuestaService.verPropuesta( id ).then( verm => {
          return fs.createReadStream( verm ).pipe(response);
        }).catch( err =>{
             response.status(HttpStatus.CONFLICT).json(err);
        } );
    }

}
