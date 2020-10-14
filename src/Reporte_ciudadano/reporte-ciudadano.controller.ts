import { Controller, Post, Body, Get, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ReporteCiudadanoDTO } from './dto/reporte-ciudadano.dto';
import { ReporteCiudadanoService } from './reporte-ciudadano.service';
import { reporteCiudadano } from './reporte-ciudadano.entity';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'

@Controller('rc')
export class ReporteCiudadanoController {

    constructor(private reporteCiudadanoService: ReporteCiudadanoService) {}

    // Endpoint guardarRC.
    @Post()
    guardarRC( @Body() body: ReporteCiudadanoDTO ): Promise<reporteCiudadano>  {
        return this.reporteCiudadanoService.guardarRC(body);
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
    obtenerRC( @Param('categoria') categoria: number, @Param('areaRC') area: number, @Param('pagina') pagina: number ): Promise<{ rcArr: reporteCiudadano[], nSig: number }> {
        return this.reporteCiudadanoService.obtenerRC( categoria, area, pagina);
    }

}
