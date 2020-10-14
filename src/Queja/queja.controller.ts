import { Body, Controller, HttpStatus, Post, Res, Get, Param } from '@nestjs/common';
import { createquejadto } from './Dto/queja.dto';
import { QuejaService } from './queja.service';
import { Queja } from './queja.entity';

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

    //Endpoint obtenerQueja.
    @Get(':categoria/:areaQ/:pagina')
    obtenerQueja( @Param('categoria') categoria: number, @Param('areaQ') area: number, @Param('pagina') pagina: number ): Promise<{ rcArr: Queja[], nSig: number }> {
        return this.quejaservice.obtenerQueja( categoria, area, pagina);
    }

    //Endpoint obtenerQuejaGraph.
    @Get('graph/:categoria/:areaQ/:fechaIni/:fechaFin')
    obtenerQuejaGraph( @Param('categoria') categoria: number, @Param('areaQ') area: number, @Param('fechaIni') fechaIni: string, @Param('fechaFin') fechaFin: string ): Promise<any[]> {
        return this.quejaservice.obtenerQuejaGraph(categoria, area, fechaIni, fechaFin);
    }

}
