import { Controller, Post, Body, Get } from '@nestjs/common';
import { CategoriaService } from './categoria.service';

@Controller('categoria')
export class CategoriaController {

    constructor(
        private categoriaService: CategoriaService,
    ){}

    @Post()
    guardarCategoria(){
        return this.categoriaService.crearCategoria();
    }

    @Post('/area')
    guardarAreaP(){
        return this.categoriaService.crearAreasQyP();
    }

    @Post('/arearc')
    guardarAreaRC(){
        return this.categoriaService.crearAreasRC();
    }

    @Get()
    obtenerCategorias(){
        return this.categoriaService.obtenerCategoria();
    }

    @Get('/areap')
    obtenerAreaP(){
        return this.categoriaService.obtenerAreasP();
    }

    @Get('/areaq')
    obtenerAreaQ(){
        return this.categoriaService.obtenerAreasQ();
    }
    
    @Get('/arearc')
    obtenerAreaRC(){
        return this.categoriaService.obtenerAreasRC();
    }
}
