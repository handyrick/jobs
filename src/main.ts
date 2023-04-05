import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  const port = config.get<string>('PORT') || 3000;
  await app.listen(port);
  Logger.log(`App is running on port: ${port}`);
}
bootstrap();
