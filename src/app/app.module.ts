import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { routes } from 'src/api/routes';
import { AppController } from './app.controller';
import { ApiModule } from 'src/api/api.module';
import { ClsMiddleware } from 'src/utils/cls/cls.middleware';

@Module({
  imports: [RouterModule.register(routes), ApiModule],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClsMiddleware).forRoutes('*');
  }
}
