import { Prometheus } from '@promster/metrics';
import { MetricsController } from 'src/metrics/server/metrics.controller';

describe('Test get metrics summary method', () => {
  let metricsController: MetricsController;

  beforeEach(() => {
    metricsController = new MetricsController();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should return a summary of all existing metrics', async () => {
    const metricName = 'xxx';
    const metricHelp = 'xxx';
    new Prometheus.Counter({ name: metricName, help: metricHelp });

    const result = await metricsController.getMetrics();
    expect(result).toMatch(new RegExp(`HELP ${metricName} ${metricHelp}`));
  });
});
