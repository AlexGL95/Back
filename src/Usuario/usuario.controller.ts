import { Body, Controller, Post, Res, HttpStatus, Put, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { createusuariodto } from './Dto/usuario.dto';


@Controller('usuario')
export class UsuarioController {

    constructor(
        private uservice: UsuarioService
    ){}

    @Post()
    create(@Res()res, @Body() createusuario: createusuariodto){
        this.uservice.CrearUsuario(createusuario).then(usuario => {
            res.status(HttpStatus.CREATED).json(usuario);
        }).catch(()=>{
            res.status(HttpStatus.CONFLICT).json({mensaje:'Error en la creacion del usuario'});
        });
    }

    @Put(':id')
    updateusuario(@Param('id')id, @Res() res, @Body() createusuariodto: createusuariodto){
        this.uservice.updateusuario(id,createusuariodto).then(userup =>{
            res.status(HttpStatus.CREATED).json(userup);
        }).catch(()=>{
            res.status(HttpStatus.CONFLICT).json({mensaje:'Error en la actualizacion del usuario'});
        });
    }

    @Delete(':id')
    deleteusuario(@Param('id')id, @Res()res){
        this.uservice.deleteusuario(id).then(del=>{
            res.status(HttpStatus.OK).json(del);
        }).catch(()=>{
            res.status(HttpStatus.CONFLICT).json({Mensaje:'Error en la eliminacion del usuario'});
        });
    }

}
