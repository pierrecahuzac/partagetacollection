import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
//import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("coucou")
    // Définir correctement le chemin du dossier uploads
    const uploadPath = join(__dirname, 'uploads');
    console.log('🛠️ Upload path:', uploadPath);
  
    // Servir les fichiers statiques
    app.use('/api/uploads', express.static(uploadPath));


  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    optionsSuccessStatus: 204,
    allowedHeaders: ['content-type', 'accept'],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
