import { Controller, Get, Param } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { Propuesta } from './propuesta.entity';

@Controller('propuesta')
export class PropuestaController {

    constructor(private reporteCiudadanoService: PropuestaService) {}

    //Endpoint obtenerPropuestas.
    @Get(':categoria/:areaP/:pagina')
    obtenerPropuestas( @Param('categoria') categoria: number, @Param('areaP') area: number, @Param('pagina') pagina: number ): Promise<{ rcArr: Propuesta[], nSig: number }> {
        return this.reporteCiudadanoService.obtenerPropuesta( categoria, area, pagina);
    }

    //Endpoint obtenerPropuestaGraph.
    @Get('graph/:categoria/:areaP/:fechaIni/:fechaFin')
    obtenerPropuestaGraph( @Param('categoria') categoria: number, @Param('areaP') area: number, @Param('fechaIni') fechaIni: string, @Param('fechaFin') fechaFin: string ): Promise<any[]> {
        return this.reporteCiudadanoService.obtenerPropuestaGraph(categoria, area, fechaIni, fechaFin);
    }

}
