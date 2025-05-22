import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove all fields that are not in the DTO
      forbidNonWhitelisted: true, // throw an error if there is a non-whitelisted field
      transform: true, // transform the data to the type of the DTO
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
