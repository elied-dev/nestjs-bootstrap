import helmet from '@fastify/helmet';
import { plugin as promsterPlugin } from '@promster/fastify';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import Fastify from 'fastify';
import { MetricsService } from './metrics/metrics.service';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { LoggerInterceptor } from './common/logger/logger.interceptor';

export const appFastifyInstance = () => {
  const fastifyInstance = Fastify();

  //  app lifecycle
  fastifyInstance.addHook('onReady', () => {
    fastifyInstance.decorate('metrics', MetricsService.getCustomMetrics());
  });

  return fastifyInstance;
};

export const addGlobalMiddlewares = (app: NestFastifyApplication) => {
  //  global middlewares
  app.enableCors();
  app.register(helmet);
  app.register(promsterPlugin);

  // interceptors
  app.useGlobalInterceptors(new LoggerInterceptor());

  //  filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // validation
  app.useGlobalPipes(new ValidationPipe());

  return app;
};
