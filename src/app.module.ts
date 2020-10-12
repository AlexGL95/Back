import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AfiliacionModule } from './afiliacion/afiliacion.module';
import { AuthModule } from './auth/auth.module';
import { CategoriaModule } from './categoria/categoria.module';
import { EvidenciaModule } from './evidencia/evidencia.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { QuejaModule } from './queja/queja.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ReporteCiudadanoModule } from './Reporte_ciudadano/reporte-ciudadano.module';

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
    AfiliacionModule,
    AuthModule,
    CategoriaModule,
    EvidenciaModule,
    PropuestaModule,
    QuejaModule,
    UsuarioModule,
    ReporteCiudadanoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
