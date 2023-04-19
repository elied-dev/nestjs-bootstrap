import { Module } from '@nestjs/common';
import { PinoLoggerModule } from 'src/utils/logger/pino-logger.module';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';

@Module({
  imports: [PinoLoggerModule.forRoot({ context: SampleModule.name })],
  providers: [SampleService],
  controllers: [SampleController],
})
export class SampleModule {}
