import { Module } from '@nestjs/common';
import { LivenessController } from './liveness.controller';

@Module({
  controllers: [LivenessController],
})
export class LivenessModule {}
