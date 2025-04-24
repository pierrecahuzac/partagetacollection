import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as dotenv from "dotenv";
import { join } from 'path';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env' });
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Servir les fichiers statiques
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  //@ts-ignore
  
  app.enableCors({
    origin: process.env.CLIENT_URL,


    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    optionsSuccessStatus: 204,
    allowedHeaders: ['content-type', 'accept'],
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
