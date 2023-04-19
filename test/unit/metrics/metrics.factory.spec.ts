import { Prometheus } from '@promster/metrics';
import { buildCounter, buildGauge, buildHistogram, buildSummary } from 'src/metrics/metrics.factory';

describe('Test factory methods', () => {
  it('should create a Counter', () => {
    const metric = buildCounter({ name: 'xxx' });
    expect(metric).toBeInstanceOf(Prometheus.Counter<string>);
  });

  it('should create a Gauge', () => {
    const metric = buildGauge({ name: 'yyy' });
    expect(metric).toBeInstanceOf(Prometheus.Gauge<string>);
  });

  it('should create an Histogram', () => {
    const metric = buildHistogram({ name: 'zzz' });
    expect(metric).toBeInstanceOf(Prometheus.Histogram<string>);
  });

  it('should create a Summary', () => {
    const metric = buildSummary({ name: 'aaa' });
    expect(metric).toBeInstanceOf(Prometheus.Summary<string>);
  });
});
