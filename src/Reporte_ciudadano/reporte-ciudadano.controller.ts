import { Controller, Post, Body } from '@nestjs/common';
import { ReporteCiudadanoDTO } from './dto/reporte-ciudadano.dto';
import { ReporteCiudadanoService } from './reporte-ciudadano.service';

@Controller('rc')
export class ReporteCiudadanoController {

    constructor(private reporteCiudadanoService: ReporteCiudadanoService) {}

    //Endpoint guardarRC.
    @Post()
    guardarRC( @Body() body: ReporteCiudadanoDTO ): Promise<string>  {
        return this.reporteCiudadanoService.guardarRC(body);
    }

}
