import { DynamicModule, Module } from '@nestjs/common';
import { Service } from 'src/types/service.types';
import { PinoLoggerService } from './pino-logger.service';

@Module({
  providers: [PinoLoggerService],
  exports: [PinoLoggerService],
})
export class PinoLoggerModule {
  static forRoot({ context, service }: { context: string; service?: string }): DynamicModule {
    return {
      module: PinoLoggerModule,
      providers: [
        {
          provide: PinoLoggerService,
          useValue: new PinoLoggerService({ service: service || Service.APP, context }),
        },
      ],
    };
  }
}
