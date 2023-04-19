import { Prometheus, getSummary } from '@promster/metrics';
import { MetricsStoreService } from 'src/metrics/store/metrics-store.service';
import { TimerMetric } from 'src/metrics/store/timer-metric';

describe('Testing MetricStore', () => {
  const metricStore: MetricsStoreService = new MetricsStoreService({
    xxx_counter: new Prometheus.Counter({ name: 'xxx_counter', help: 'default', labelNames: ['status'] }),
    xxx_gauge: new Prometheus.Gauge({ name: 'xxx_gauge', help: 'default', labelNames: ['status'] }),
    xxx_histogram: new Prometheus.Histogram({ name: 'xxx_histogram', help: 'default' }),
    xxx_summary: new Prometheus.Summary({ name: 'xxx_summary', help: 'default' }),
  });

  it("shouldn't fail when getting a non existing metric", () => {
    metricStore.inc('not_existing_metric');
    expect(true).toBeTruthy();
  });

  it("shouldn't fail when trying an unauthorized operation on metric", () => {
    //  cannot increment an histogram metric
    metricStore.inc('xxx_histogram');
    metricStore.dec('xxx_histogram');
    metricStore.observe('xxx_gauge', 2);

    expect(true).toBeTruthy();
  });

  it('should check "inc" method', async () => {
    metricStore.inc('xxx_counter');
    let result = await getSummary();
    expect(result).toMatch(/xxx_counter 1/);

    metricStore.inc('xxx_counter', { labels: { status: 'success' } });
    result = await getSummary();
    expect(result).toMatch(/xxx_counter 1/);
    expect(result).toMatch(/xxx_counter{status=\"success\"} 1/);

    metricStore.inc('xxx_counter', { value: 2 });
    result = await getSummary();
    expect(result).toMatch(/xxx_counter 3/);
    expect(result).toMatch(/xxx_counter{status=\"success\"} 1/);
  });

  it('should check "dec" method', async () => {
    metricStore.dec('xxx_gauge');
    let result = await getSummary();
    expect(result).toMatch(/xxx_gauge -1/);

    metricStore.dec('xxx_gauge', { labels: { status: 'success' } });
    result = await getSummary();
    expect(result).toMatch(/xxx_gauge -1/);
    expect(result).toMatch(/xxx_gauge{status=\"success\"} -1/);

    metricStore.dec('xxx_gauge', { value: 2 });
    result = await getSummary();
    expect(result).toMatch(/xxx_gauge -3/);
    expect(result).toMatch(/xxx_gauge{status=\"success\"} -1/);
  });

  it('should check "observe" method', async () => {
    metricStore.observe('xxx_histogram', 1);
    let result = await getSummary();
    expect(result).toMatch(/xxx_histogram_bucket{le=\"0.5\"} 0/);
    expect(result).toMatch(/xxx_histogram_bucket{le=\"1\"} 1/);

    metricStore.observe('xxx_histogram', 6, {});
    result = await getSummary();
    expect(result).toMatch(/xxx_histogram_bucket{le=\"2.5\"} 1/);
    expect(result).toMatch(/xxx_histogram_bucket{le=\"5\"} 1/);
  });

  it('should create a timer', () => {
    const timer = metricStore.createTimer('xxx_summary');
    expect(timer).toBeInstanceOf(TimerMetric);
    expect(timer.start).not.toBeNull();
    expect(timer.stop).toBeNull();

    timer.start();
    expect(timer.stop).not.toBeNull();
    timer.stop();
  });
});
