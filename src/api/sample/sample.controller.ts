import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SampleService } from './sample.service';

@ApiTags('Sample')
@Controller()
export class SampleController {
  constructor(public sampleService: SampleService) {}

  @Get()
  async getAllSamples() {
    return this.sampleService.getAllSamples();
  }

  @Get(':id')
  getSampleById(@Param('id') id: string) {
    return this.sampleService.getSampleById(id);
  }

  @Post()
  createSample(@Body() sample: any) {
    return this.sampleService.createSample(sample);
  }
}
