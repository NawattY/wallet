import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { i18nValidationErrorFactory } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: i18nValidationErrorFactory,
    }),
  );

  app.enableCors();

  await app.init();
  const configService = app.get(ConfigService);
  await app.listen(
    configService.get('app.port'),
    configService.get('app.host'),
  );
}
bootstrap();
