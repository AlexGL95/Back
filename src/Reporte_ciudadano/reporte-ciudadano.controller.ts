import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ReporteCiudadanoDTO } from './dto/reporte-ciudadano.dto';
import { ReporteCiudadanoService } from './reporte-ciudadano.service';
import { reporteCiudadano } from './reporte-ciudadano.entity';

@Controller('rc')
export class ReporteCiudadanoController {

    constructor(private reporteCiudadanoService: ReporteCiudadanoService) {}

    // Endpoint guardarRC.
    @Post()
    guardarRC( @Body() body: ReporteCiudadanoDTO ): Promise<string>  {
        return this.reporteCiudadanoService.guardarRC(body);
    }

    //Endpoint obtenerRC.
    @Get(':categoria/:areaRC/:pagina')
    obtenerRC( @Param('categoria') categoria: number, @Param('areaRC') area: number, @Param('pagina') pagina: number ): Promise<{ rcArr: reporteCiudadano[], nSig: number }> {
        return this.reporteCiudadanoService.obtenerRC( categoria, area, pagina);
    }

    //Endpoint obtenerRcGraph.
    @Get('graph/:categoria/:areaRC/:fechaIni/:fechaFin')
    obtenerRcGraph( @Param('categoria') categoria: number, @Param('areaRC') area: number, @Param('fechaIni') fechaIni: string, @Param('fechaFin') fechaFin: string ): Promise<any[]> {
        return this.reporteCiudadanoService.obtenerRcGraph(categoria, area, fechaIni, fechaFin);
    }

}
