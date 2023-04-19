import { Routes } from '@nestjs/core';
import { HealthModule } from './health/health.module';
import { SampleModule } from './sample/sample.module';

export const routes: Routes = [
  {
    path: '',
    module: HealthModule,
  },
  {
    path: 'api',
    children: [
      {
        path: 'sample',
        module: SampleModule,
      },
    ],
  },
];
