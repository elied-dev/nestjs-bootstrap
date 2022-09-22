import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Counters } from 'src/metrics/utils/metrics.constants';
import { MetricsService } from 'src/metrics/metrics.service';

@ApiTags('Health')
@Controller()
export class HealthController {
  @Get()
  async health(): Promise<{ message: string }> {
    MetricsService.inc(Counters.HEALTH_REQUEST);
    return { message: 'OK' };
  }
}
