import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import type { Request, Response } from 'express';
import { PgExceptionFilter } from './common/filters/pg-exception.filter';
import { apiReference } from '@scalar/nestjs-api-reference';
import { LoggingInterceptor } from './common/interceptors/logging.middleware';

function setupOpenApi(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('Hefesto API')
    .setDescription('Hardware listings')
    .setVersion('1.0')
    .addCookieAuth('session')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  app.getHttpAdapter().get('/docs-json', (_req: Request, res: Response) => {
    res.type('application/json');
    res.send(documentFactory());
  });

  app.use(
    '/docs',
    apiReference({
      pageTitle: 'Hefesto API Documentation',
      url: '/docs-json',
      theme: 'purple',
      persistAuth: true,
    }),
  );
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableShutdownHooks();

  app.set('trust proxy', true);
  app.use(cookieParser());
  app.enableCors({
    origin: ['https://hefesto.felsen.io', 'http://localhost:3000'],
    credentials: true,
  });

  app.useGlobalInterceptors(new LoggingInterceptor());

  if (process.env.NODE_ENV !== 'production') {
    setupOpenApi(app);
  }

  app.useGlobalFilters(new PgExceptionFilter());
  app.enableShutdownHooks();

  const port = Number(process.env.PORT) || 3001;

  await app.listen(port);
}

void bootstrap();
