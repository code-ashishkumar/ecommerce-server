import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });
  // app.useLogger(new Logger());
  app.useLogger(new Logger('verbose'));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
