import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Root')
@Controller()
export class AppController {
  @Get()
  getRoot(): { message: string; timestamp: string } {
    return {
      message: 'Nothing to see here (app)',
      timestamp: new Date().toISOString(),
    };
  }
}
