import { Controller, Get, INestApplication, MiddlewareConsumer, Module } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ClsMiddleware } from 'src/common/middlewares/cls.middleware';
import * as request from 'supertest';

const RETURN_VALUE = 'test';

@Controller()
class TestController {
  @Get('test')
  test() {
    return RETURN_VALUE;
  }

  @Get('tests/wildcard_nested')
  wildcard_nested() {
    return RETURN_VALUE;
  }
}

@Module({
  controllers: [TestController],
})
class TestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClsMiddleware).forRoutes('*');
  }
}

describe('Test ClsMiddleware', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = (
      await Test.createTestingModule({
        imports: [TestModule],
      }).compile()
    ).createNestApplication();

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it(`forRoutes(*)`, () => {
    return request(app.getHttpServer()).get('/test').expect(200, RETURN_VALUE);
  });
});
