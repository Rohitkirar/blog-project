import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
   keys: ["1234567890"] // key for encryption : session data
  }));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //means removed properties not defined in dto from requests
    transform: true, // create dto instance from request
  }),)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
