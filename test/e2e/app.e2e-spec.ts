import { Test, TestingModule } from '@nestjs/testing';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import * as request from 'supertest';
import { RouterModule } from '@nestjs/core';
import { ApiModule } from 'src/api/api.module';
import { routes } from 'src/api/routes';
import { ClsMiddleware } from 'src/common/middlewares/cls.middleware';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { getAppFastifyInstance, setupServerConfiguration } from 'src/config/server.config';
import { PinoLoggerService } from 'src/utils/logger/pino-logger.service';
import { MetricsStoreModule } from 'src/metrics/store/metrics-store.module';
import { AllMetrics } from 'src/metrics/metrics';

jest.setTimeout(20000);

@Module({
  imports: [RouterModule.register(routes), ApiModule, MetricsStoreModule.register({ store: AllMetrics })],
})
export class AppTestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClsMiddleware).forRoutes('*');
  }
}

describe('App (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppTestModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter(getAppFastifyInstance()), {
      logger: PinoLoggerService.AppLogger.addProperties({ operation: 'APP_INIT' }),
    });
    setupServerConfiguration(app);

    // add same config
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('should success /health (GET)', () => {
    return request(app.getHttpServer()).get('/health').expect(200);
  });

  it('should success /liveness (GET)', () => {
    return request(app.getHttpServer()).get('/liveness').expect(200);
  });

  it('should success /readiness (GET)', () => {
    return request(app.getHttpServer()).get('/readiness').expect(200);
  });
});
