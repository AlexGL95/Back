import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AfiliacionModule } from './Afiliacion/afiliacion.module';
import { AuthModule } from './Auth/auth.module';
import { CategoriaModule } from './Categoria/categoria.module';
import { EvidenciaModule } from './Evidencia/evidencia.module';
import { PropuestaModule } from './Propuesta/propuesta.module';
import { QuejaModule } from './Queja/queja.module';
import { UsuarioModule } from './Usuario/usuario.module';

@Module({
  imports: [AfiliacionModule,
    AuthModule,
    CategoriaModule,
    EvidenciaModule,
    PropuestaModule,
    QuejaModule,
    UsuarioModule,
    MulterModule.register({
      dest: '/files',
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
