import { Controller, Get } from '@nestjs/common';
import { getSummary } from '@promster/metrics';

@Controller()
export class MetricsController {
  @Get('/metrics')
  getMetrics() {
    return getSummary();
  }
}
