import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';

export enum AppStatus {
  OK = 'OK',
  NOK = 'NOK',
}
export type HealthResponse = { status: AppStatus; message: string };

@Controller()
@ApiTags('Health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/health')
  async getHealth(): Promise<HealthResponse> {
    if (await this.healthService.isHealthy()) {
      return {
        status: AppStatus.OK,
        message: 'App is healthy',
      };
    }
    throw new Error('App unhealthy');
  }
  @Get('/readiness')
  async getReadiness(): Promise<HealthResponse> {
    if (await this.healthService.isReady()) {
      return {
        status: AppStatus.OK,
        message: 'App is ready',
      };
    }
    throw new Error('App is not ready');
  }
  @Get('/liveness')
  async getLiveness(): Promise<HealthResponse> {
    if (await this.healthService.isLive()) {
      return {
        status: AppStatus.OK,
        message: 'App is live',
      };
    }
    throw new Error('App is not live');
  }
}
