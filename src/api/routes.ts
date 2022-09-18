import { ReadinessModule } from './readiness/readiness.module';
import { LivenessModule } from './liveness/liveness.module';
import { HealthModule } from './health/health.module';
import { Routes } from '@nestjs/core';

export const routes: Routes = [
  {
    path: 'health',
    module: HealthModule,
  },
  {
    path: 'liveness',
    module: LivenessModule,
  },
  {
    path: 'readiness',
    module: ReadinessModule,
  },
  {
    path: 'api',
    children: [],
  },
];
