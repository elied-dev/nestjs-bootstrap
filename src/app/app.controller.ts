import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): { message: string } {
    return {
      message: 'Nothing to see here (app)',
    };
  }
}
