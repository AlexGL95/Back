import { Propuesta } from './propuesta.entity';
import { Controller, Post, Body, Res, HttpStatus, UseInterceptors, UploadedFiles, Get, Delete, Param } from '@nestjs/common';
import { Propuestadto } from './dto/crearPropuesta.dto';
import { response } from 'express';
import { diskStorage } from 'multer'
import { PropuestaService } from './propuesta.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { QuejaService } from 'src/Queja/queja.service';
import { get } from 'http';

@Controller('propuesta')
export class PropuestaController {

    constructor(
        private propuestaService: PropuestaService,
        private reporteCiudadanoService: PropuestaService,
    ){}

    @Post()
    guardarPropuesta(@Body() propuestadto: Propuestadto, @Res() response){
        this.propuestaService.guardarPropuesta(propuestadto).then(propuestam => {
            response.status(HttpStatus.CREATED).json(propuestam);
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
    obtenerPropuesta( @Param('categoria') categoria: number, @Param('areaP') area: number, @Param('pagina') pagina: number ): Promise<{ rcArr: Propuesta[], nSig: number }> {
        return this.reporteCiudadanoService.obtenerPropuesta( categoria, area, pagina);
    }

    //Endpoint obtenerPropuestaGraph.
    @Get('graph/:categoria/:areaP/:fechaIni/:fechaFin')
    obtenerPropuestaGraph( @Param('categoria') categoria: number, @Param('areaP') area: number, @Param('fechaIni') fechaIni: string, @Param('fechaFin') fechaFin: string ): Promise<any[]> {
        return this.reporteCiudadanoService.obtenerPropuestaGraph(categoria, area, fechaIni, fechaFin);
    }

}
