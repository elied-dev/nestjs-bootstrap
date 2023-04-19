import { Global, Module } from '@nestjs/common';
import { MetricsStoreService } from './metrics-store.service';
import { MetricsStoreOptions } from './metrics-store.dto';

@Global()
@Module({
  providers: [MetricsStoreService],
  exports: [MetricsStoreService],
})
export class MetricsStoreModule {
  static register(options: MetricsStoreOptions) {
    return {
      module: MetricsStoreModule,
      providers: [
        {
          provide: MetricsStoreService,
          useValue: new MetricsStoreService(options.store),
        },
      ],
    };
  }
}
