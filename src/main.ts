import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });

  app.enableCors({
    origin: '*', // You can specify your frontend URL here (e.g., 'http://localhost:4200' for Angular or React)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const config = new DocumentBuilder()
    .setTitle('E-commerce API')
    .setDescription('Automatically generated API documentation')
    .setVersion('1.0')
    .addBearerAuth() // Optional: Add bearer token for secured endpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // app.useLogger(new Logger());
  app.useLogger(new Logger('verbose'));
  Logger.log('Swagger is available on http://localhost:3000/api');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
