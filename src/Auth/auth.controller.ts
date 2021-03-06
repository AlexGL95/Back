import { Body, Controller, Post, Res, UnauthorizedException, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UsuarioService } from '../Usuario/usuario.service';
import { authcredentialsdto } from './Dto/authcredentials.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private auth: UsuarioService,
        private jwtService: JwtService,
    ){}

    @Post('signin')
    async signIn(@Body()authcredentials:authcredentialsdto, @Res() response){
        let user = await this.auth.validatepass(authcredentials);
        if (!user) {
            throw new UnauthorizedException('Credenciales Invalidas');
        } else {
            let correo= user.correo;
            const payload = { correo };
            const accesstoken = await this.jwtService.sign(payload);
            let res = {token: accesstoken, correo: correo}
            response.status(HttpStatus.ACCEPTED).json(res);
        }
    }

    @Post('upd')
    @UseGuards(AuthGuard())
    async updt(@Body() correo: string, @Res() response){
            const payload =correo;
            const accesstoken = await this.jwtService.sign(payload);
            let res = {token: accesstoken}
            response.status(HttpStatus.ACCEPTED).json(res);
    }
}
