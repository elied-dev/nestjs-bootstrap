import { Prometheus, getSummary } from '@promster/metrics';
import { TimerMetric } from 'src/metrics/store/timer-metric';
import { sleep } from 'src/utils';

describe('Testing timer metric', () => {
  it('should start timer to and log time greater than 1s', async () => {
    const metricName = 'xxx';
    const metricHelp = 'xxx';
    const metric = new Prometheus.Histogram({ name: metricName, help: metricHelp });
    const timer = new TimerMetric(metric);

    timer.start();
    await sleep(1000);
    timer.stop();
    const result = await getSummary();
    /*
    "# HELP xxx xxx
    \n# TYPE xxx histogram
    \nxxx_bucket{le=\"0.005\"} 0\nxxx_bucket{le=\"0.01\"} 0\nxxx_bucket{le=\"0.025\"} 0\nxxx_bucket{le=\"0.05\"} 0\nxxx_bucket{le=\"0.1\"} 0\nxxx_bucket{le=\"0.25\"} 0\nxxx_bucket{le=\"0.5\"} 0\nxxx_bucket{le=\"1\"} 0\nxxx_bucket{le=\"2.5\"} 1\nxxx_bucket{le=\"5\"} 1\nxxx_bucket{le=\"10\"} 1\nxxx_bucket{le=\"+Inf\"} 1
    \nxxx_sum 1.000710166\nxxx_count 1\n"
    */
    expect(result).toMatch(new RegExp(`${metricName}_sum 1.0`));
    expect(result).toMatch(new RegExp(`${metricName}_count 1`));
  });
});
