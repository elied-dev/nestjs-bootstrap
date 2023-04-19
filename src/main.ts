import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { setupServerConfiguration, getAppFastifyInstance } from './config/server.config';
import { setupOpenapiConfiguration } from './config/openapi.config';
import { appConfig } from './config';
import { PinoLoggerService } from './utils/logger/pino-logger.service';
import { MetricsServerModule } from './metrics/server/metrics-server.module';
import { signalIsUp } from '@promster/fastify';

async function bootstrapApp() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(getAppFastifyInstance()), {
    logger: PinoLoggerService.AppLogger.addProperties({ operation: 'APP_INIT' }),
  });
  setupServerConfiguration(app);
  setupOpenapiConfiguration(app);

  await app.listen(appConfig.appPort, '0.0.0.0');
}

async function bootstrapMetricsApp() {
  const app = await NestFactory.create<NestFastifyApplication>(
    MetricsServerModule,
    new FastifyAdapter(getAppFastifyInstance()),
    {
      logger: false,
    },
  );

  await app.listen(appConfig.metricsConfig.metricsPort, '0.0.0.0');
}

async function start() {
  await bootstrapMetricsApp();
  await bootstrapApp();

  //  set up metric to 1
  signalIsUp();
}

start();
