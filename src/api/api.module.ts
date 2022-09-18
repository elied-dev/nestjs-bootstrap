import { ReadinessModule } from './readiness/readiness.module';
import { LivenessModule } from './liveness/liveness.module';
import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';

@Module({
  imports: [HealthModule, LivenessModule, ReadinessModule],
})
export class ApiModule {}
