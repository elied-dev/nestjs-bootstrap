import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CountersLabels } from 'src/metrics/utils/metrics.constants';
import { MetricsService } from 'src/metrics/metrics.service';

@ApiTags('Health')
@Controller()
export class HealthController {
  @Get()
  async health(): Promise<{ message: string }> {
    MetricsService.inc(CountersLabels.HEALTH_REQUEST);
    return { message: 'OK' };
  }
}
