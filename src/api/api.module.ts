import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [HealthModule, SampleModule],
})
export class ApiModule {}
