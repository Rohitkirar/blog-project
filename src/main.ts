import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //means removed properties not defined in dto from requests
    transform: true, // create dto instance from request
  }),)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
