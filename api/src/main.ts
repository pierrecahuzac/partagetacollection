import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
//import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Définir correctement le chemin du dossier uploads
  const uploadPath = join(__dirname, 'uploads');


  // Servir les fichiers statiques
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  //@ts-ignore
  
  app.enableCors({
    origin: 'http://192.168.1.59:5173',

    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    optionsSuccessStatus: 204,
    allowedHeaders: ['content-type', 'accept'],
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
