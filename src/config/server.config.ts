import helmet from '@fastify/helmet';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import Fastify from 'fastify';
import { ExceptionFilter, NestInterceptor, PipeTransform, ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { plugin } from '@promster/fastify';

export const getAppFastifyInstance = () => {
  const fastifyInstance = Fastify();
  return fastifyInstance;
};

export const setupServerConfiguration = (app: NestFastifyApplication) => {
  //  global middlewares
  app.enableCors();
  app.register(helmet);
  app.register(plugin);
  // interceptors
  const globalInterceptors: NestInterceptor[] = [new LoggerInterceptor()];
  app.useGlobalInterceptors(...globalInterceptors);

  //  filters
  const globalFilters: ExceptionFilter[] = [new HttpExceptionFilter()];
  app.useGlobalFilters(...globalFilters);

  // validation
  const globalPipes: PipeTransform<any>[] = [new ValidationPipe()];
  app.useGlobalPipes(...globalPipes);

  return app;
};
