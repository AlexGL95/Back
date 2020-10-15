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
    create(@Res() res, @Body() createqueja: createquejadto){
        this.quejaService.createqueja(createqueja).then( queja => {
            res.status(HttpStatus.CREATED).json(queja)
        }).catch(()=>{
            res.status(HttpStatus.CONFLICT).json({mensaje:'Error en la creacion de la queja'});
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
    obtenerQueja( @Param('categoria') categoria: number, @Param('areaQ') area: number, @Param('pagina') pagina: number ): Promise<{ rcArr: Queja[], nSig: number }> {
        return this.quejaService.obtenerQueja( categoria, area, pagina);
    }

    //Endpoint obtenerQuejaGraph.
    @Get('graph/:categoria/:areaQ/:fechaIni/:fechaFin')
    obtenerQuejaGraph( @Param('categoria') categoria: number, @Param('areaQ') area: number, @Param('fechaIni') fechaIni: string, @Param('fechaFin') fechaFin: string ): Promise<any[]> {
        return this.quejaService.obtenerQuejaGraph(categoria, area, fechaIni, fechaFin);
    }

    @Get()
    obtenerQuejas(@Res() response){
      return this.quejaService.obtenerQuejas().then(obtenerPropuestas => {
        response.status(HttpStatus.OK).json(obtenerPropuestas);
      }).catch(err => {
        response.status(HttpStatus.CONFLICT).json(err)
      });
    }

    @Get('/:id')
    verPropuesta( @Param('id') id, @Res() response ) {
        this.quejaService.verQueja( id ).then( verm => {
            response.status(HttpStatus.OK).json( verm );
        }).catch( err =>{
             response.status(HttpStatus.CONFLICT).json(err);
        } );
    }

}

