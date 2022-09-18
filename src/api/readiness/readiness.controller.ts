import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Readiness')
@Controller()
export class ReadinessController {
  @Get()
  health() {
    return { message: 'OK' };
  }
}
