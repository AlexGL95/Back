//Modules
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
//Entities

//Interfaces
import { JwtPayload } from './jwt_payload.interface'
import { Usuario } from '../Usuario/usuario.entity';
import { Repository } from 'typeorm';

export class JwtStrategy extends PassportStrategy (Strategy){
    
   constructor(
        @InjectRepository(Usuario)
        private userrep: Repository<Usuario>,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'Cadenasuperindecifrable',
        });

    }

    async validate(payload: JwtPayload):Promise<Usuario>{
        const correo = payload.correo;
        console.log('payload',payload);
        console.log('correo',correo);
        
        const user = await this.userrep.findOne({where:{correo:`${correo}`}}  );
        if (!user) {
            console.log(user);
            throw new UnauthorizedException();
        }
        return user;
    }
}