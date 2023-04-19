import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  async isHealthy(): Promise<boolean> {
    //  You can implement here a more complexe logic for health check
    return true;
  }

  async isReady(): Promise<boolean> {
    //  You can implement here a more complexe logic for liveness check
    return true;
  }

  async isLive(): Promise<boolean> {
    //  You can implement here a more complexe logic for readiness check
    return true;
  }
}
