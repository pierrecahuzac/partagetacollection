import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import * as cookieParser from 'cookie-parser';
async function bootstrap() {  
  const app = await NestFactory.create(AppModule);
  //app.use(cookieParser());

  // app.use((req, res, next) => {
  //   console.log(req.headers);
  //   console.log(req.headers.origin);
  //   next();
  // });
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
