import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const CORS_OPTIONS = {
  "origin": " http://piina.oruzservice.com",
  "methods": "GET,HEAD,PUT,POST,DELETE",
  "allowedHeaders": 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: CORS_OPTIONS });
  await app.listen(3003);
}
bootstrap();