import { HealthModule } from './health/health.module';
import { Routes } from '@nestjs/core';

export const routes: Routes = [
  {
    path: 'health',
    module: HealthModule,
  },
  {
    path: 'v1',
    children: [],
  },
];
