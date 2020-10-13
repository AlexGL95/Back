import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { createquejadto } from './Dto/queja.dto';
import { QuejaService } from './queja.service';

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
}
