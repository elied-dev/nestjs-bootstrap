import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Metrics')
@Controller()
export class MetricsController {
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
  getMetrics() {
    return {};
  }
}
