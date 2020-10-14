import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './Auth/auth.module';
import { CategoriaModule } from './Categoria/categoria.module';
import { EvidenciaModule } from './Evidencia/evidencia.module';
import { PropuestaModule } from './Propuesta/propuesta.module';
import { QuejaModule } from './Queja/queja.module';
import { UsuarioModule } from './Usuario/usuario.module';
import { ReporteCiudadanoModule } from './Reporte_ciudadano/reporte-ciudadano.module';
import { ArchivosModule } from './archivos/archivos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'escuchav1',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    CategoriaModule,
    EvidenciaModule,
    PropuestaModule,
    QuejaModule,
    UsuarioModule,
    ReporteCiudadanoModule,
    MulterModule.register({
      dest: '/files',
    }),
    ArchivosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
