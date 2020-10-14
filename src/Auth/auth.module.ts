import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Usuario } from '../Usuario/usuario.entity';
import { UsuarioModule } from '../Usuario/usuario.module';
import { JwtStrategy } from './jwt.strategy';
import { UsuarioService } from '../Usuario/usuario.service';

@Module({
  imports:[TypeOrmModule.forFeature([Usuario]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret:'Cadenasuperindecifrable',
            signOptions:{
                expiresIn: 3600,
            },
        }),
        JwtModule.register({
          secret:'Cadenasuperindecifrable',
          signOptions:{
              expiresIn: 3600,
          },
      }),
        UsuarioModule
],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UsuarioService
  ],
  exports:[
    PassportModule,
    JwtStrategy,
  ]
})
export class AuthModule {}
