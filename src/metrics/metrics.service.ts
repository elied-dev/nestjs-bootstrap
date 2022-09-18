import { appConfig } from './../config/index';
import { getSummary } from '@promster/metrics';

export class MetricsService {
  private static metricsPrefix = appConfig.metricsConfig.metricsPrefix;
  async getMetrics() {
    return getSummary();
  }
}
