import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AfiliacionModule } from './afiliacion/afiliacion.module';
import { AuthModule } from './auth/auth.module';
import { CategoriaModule } from './categoria/categoria.module';
import { EvidenciaModule } from './evidencia/evidencia.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { QuejaModule } from './queja/queja.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [AfiliacionModule, AuthModule, CategoriaModule, EvidenciaModule, PropuestaModule, QuejaModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
