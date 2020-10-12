import { Controller, Get, Res } from '@nestjs/common';
import { QuejaService } from './queja.service';

@Controller('queja')
export class QuejaController {

    constructor(private quejaService: QuejaService) {}

    @Get()
    generarPDF() {
        return this.quejaService.generarPDF();
    }
}
