import { Controller, Get, Param } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { Propuesta } from './propuesta.entity';

@Controller('propuesta')
export class PropuestaController {

    constructor(private reporteCiudadanoService: PropuestaService) {}

    //Endpoint obtenerRC.
    @Get(':categoria/:areaRC/:pagina')
    obtenerRC( @Param('categoria') categoria: number, @Param('areaRC') area: number, @Param('pagina') pagina: number ): Promise<{ rcArr: Propuesta[], nSig: number }> {
        return this.reporteCiudadanoService.obtenerPropuesta( categoria, area, pagina);
    }

}
