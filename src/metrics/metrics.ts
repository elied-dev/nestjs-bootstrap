import { PrometheusMetric } from './store/metrics-store.dto';
import { buildCounter, buildGauge, buildHistogram, buildSummary } from './metrics.factory';

export enum MetricNames {
  // Counters
  SAMPLE_COUNTER = 'SAMPLE_COUNTER',

  // Gauges
  SAMPLE_GAUGE = 'SAMPLE_GAUGE',

  // Histograms
  SAMPLE_HISTOGRAM = 'SAMPLE_HISTOGRAM',

  // Summaries
  SAMPLE_SUMMARY = 'SAMPLE_SUMMARY',
}

export const AllMetrics: Record<MetricNames, PrometheusMetric> = {
  //  Counters
  [MetricNames.SAMPLE_COUNTER]: buildCounter({
    name: MetricNames.SAMPLE_COUNTER,
  }),

  //  Gauges
  [MetricNames.SAMPLE_GAUGE]: buildGauge({
    name: MetricNames.SAMPLE_GAUGE,
    help: 'Custom help for gauge sample',
    labelNames: ['status'],
  }),

  //  Histograms
  [MetricNames.SAMPLE_HISTOGRAM]: buildHistogram({
    name: MetricNames.SAMPLE_HISTOGRAM,
    buckets: [0.5, 0.6, 0.7],
  }),

  //  Summaries
  [MetricNames.SAMPLE_SUMMARY]: buildSummary({
    name: MetricNames.SAMPLE_SUMMARY,
    labelNames: ['status'],
    percentiles: [0.5, 0.6, 0.7],
  }),
};
