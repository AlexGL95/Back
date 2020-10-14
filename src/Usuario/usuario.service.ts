import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createusuariodto } from './Dto/usuario.dto';
import { Usuario } from './usuario.entity';
import { authcredentialsdto } from '../Auth/Dto/authcredentials.dto';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private userreposotorty: Repository<Usuario>,
    ){}

    async CrearUsuario(createusuario:createusuariodto){
        const user = await this.userreposotorty.findOne({where:{correo: `${createusuario.correo}` }});
        let newuser = new Usuario;
        const bcrypt = require("bcrypt");
        console.log(user);
        if (user) {
            console.log('Error sa');
            return Error;
        } else {
            newuser.id = 0;
            newuser.nombre = createusuario.nombre;
            newuser.correo =  createusuario.correo;
            newuser.salt = await bcrypt.genSalt();
            newuser.pass = await bcrypt.hash(createusuario.pass, newuser.salt);
            newuser.token = '-';
            newuser.super = true;
            newuser.activo = true;
            console.log(newuser);
            return await this.userreposotorty.save(newuser);
        }
    }

    async updateusuario(id:number, createusuariodto: createusuariodto){
        const user = await this.userreposotorty.findOne({where:{id: `${id}` }});
        const bcrypt = require ("bcrypt");
        user.nombre = createusuariodto.nombre;
        user.correo = createusuariodto.correo; 
        user.salt = await bcrypt.genSalt();
        user.pass = await bcrypt.hash(createusuariodto.pass, user.salt);
        return await this.userreposotorty.save(user);
    }

    async deleteusuario( id:number ){
        const user = await this.userreposotorty.findOne({where:{id: `${id}` }});
        if (user) {
            this.userreposotorty.delete(id);
            return {Mensaje:'Eliminacion Exitosa'};
        } else {
            return Error;
        }

    }

    //Validar contraseña
    async validatepass(authCredentials:authcredentialsdto): Promise<Usuario>{
        const {correo,pass}=authCredentials;
        const usuario = await this.userreposotorty.findOne({correo} );
        if (usuario && await usuario.validatepass(pass)) {
            return await usuario;
        } else {
            return null;
        }
    }
}
