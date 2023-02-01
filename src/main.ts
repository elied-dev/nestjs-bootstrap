import { MetricsModule } from './metrics/metrics.module';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';

import { appConfig } from './config';
import { AppLogger } from './common/logger/pino.logger';

import { addGlobalMiddlewares, appFastifyInstance } from './fastify.config';
import { openApiDocumentationSetup } from './openapi.config';

async function bootstrapMetrics() {
  const appMetrics = await NestFactory.create<NestFastifyApplication>(MetricsModule, new FastifyAdapter(), {
    logger: false,
  });
  appMetrics.enableCors();
  appMetrics.register(helmet);
  await appMetrics.listen(appConfig.metricsConfig.metricsPort, '0.0.0.0');
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(appFastifyInstance()), {
    logger: AppLogger,
  });
  openApiDocumentationSetup(app);
  addGlobalMiddlewares(app);
  await app.listen(appConfig.appPort, '0.0.0.0');
}

async function start() {
  await bootstrapMetrics();
  await bootstrap();
}

start();
