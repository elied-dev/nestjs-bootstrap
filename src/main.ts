import { MetricsModule } from './metrics/metrics.module';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { LoggerInterceptor } from './common/logger/logger.interceptor';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from '@fastify/helmet';

import { appConfig } from './config';
import { AppLogger } from './common/logger/pino.logger';

const openApiDocumentationSetup = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('NestJS Bootstrap Project')
    .setDescription('Bootstrap for quick setup in NestJS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/spec', app, document);
};

async function bootstrapMetrics() {
  const appMetrics = await NestFactory.create<NestFastifyApplication>(
    MetricsModule,
    new FastifyAdapter(),
    {
      logger: false,
    },
  );
  appMetrics.enableCors();
  appMetrics.register(helmet);
  await appMetrics.listen(appConfig.metricsConfig.metricsPort, '0.0.0.0');
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: AppLogger },
  );
  openApiDocumentationSetup(app);

  //  global middlewares
  app.enableCors();
  app.register(helmet);

  //  interceptors
  app.useGlobalInterceptors(new LoggerInterceptor());

  //  filters
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(appConfig.appPort, '0.0.0.0');
}

async function start() {
  await bootstrap();
  await bootstrapMetrics();
}

start();
