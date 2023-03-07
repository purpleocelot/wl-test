import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './services/app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });
  const appService = app.get(AppService);
  await appService.start();

  await app.close();
}
bootstrap();
