import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Liveness')
@Controller()
export class LivenessController {
  @Get()
  health() {
    return { message: 'OK' };
  }
}
