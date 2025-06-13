import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Use global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Log the port
  console.log(process.env.PORT);

  // Start the application
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
