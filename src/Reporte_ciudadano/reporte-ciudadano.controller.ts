import { Controller, Post, Body } from '@nestjs/common';
import { ReporteCiudadanoDTO } from './dto/reporte-ciudadano.dto';

@Controller('rc')
export class ReporteCiudadanoController {

    //Endpoint guardarRC.
    @Post()
    guardarRC( @Body() rcDto: ReporteCiudadanoDTO ): string  {
        return 'guardarRC escuchando';
    }

}
