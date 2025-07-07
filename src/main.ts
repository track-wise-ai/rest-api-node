import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'development'
        ? '*' // Allow any origin in development
        : true, // Same origin only in production,
    credentials: true,
  });
  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove all fields that are not in the DTO
      forbidNonWhitelisted: false, // throw an error if there is a non-whitelisted field
      transform: true, // transform the data to the type of the DTO
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
