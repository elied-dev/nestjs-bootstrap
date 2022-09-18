import { Controller, Get, Header } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getContentType } from '@promster/metrics';
import { MetricsService } from './metrics.service';

@ApiTags('Metrics')
@Controller()
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  getRoot(): { message: string } {
    return {
      message: 'Nothing to see here (metrics)',
    };
  }

  @Get('health')
  health(): { message: string } {
    return { message: 'OK' };
  }

  @Get('metrics')
  @Header('Content-Type', getContentType())
  async getMetrics() {
    return this.metricsService.getMetrics();
  }
}
