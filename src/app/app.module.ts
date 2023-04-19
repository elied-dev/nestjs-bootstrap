import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ApiModule } from 'src/api/api.module';
import { routes } from 'src/api/routes';
import { ClsMiddleware } from 'src/common/middlewares/cls.middleware';
import { AllMetrics } from 'src/metrics/metrics';
import { MetricsStoreModule } from 'src/metrics/store/metrics-store.module';

@Module({
  imports: [
    RouterModule.register(routes), 
    MetricsStoreModule.register({ store: AllMetrics }), 
    ApiModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClsMiddleware).forRoutes('*');
  }
}
