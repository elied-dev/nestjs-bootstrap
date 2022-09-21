import { Prometheus } from '@promster/metrics';
export type MetricProperties = {
  labels: string[];
  help: string;
  buckets?: number[];
  isTimerMetric?: boolean;
  percentiles?: number[];
};

export type PrometheusMetric =
  | Prometheus.Counter
  | Prometheus.Gauge
  | Prometheus.Histogram
  | Prometheus.Summary;

export type CustomMetrics = Record<string, MetricDetails>;

export type MetricDetails = {
  metric: PrometheusMetric;
  type: MetricTypes;
  name: string;
};

export type MetricDefinition = {
  name: string;
  type: MetricTypes;
  properties: MetricProperties;
};

export type MetricBuilderFunction = (
  name: string,
  properties: MetricProperties,
  metricsPrefix: string,
) => PrometheusMetric;

export enum MetricTypes {
  COUNTER = 'counter',
  HISTOGRAM = 'histogram',
  GAUGE = 'gauge',
  SUMMARY = 'summary',
}

export type MetricLabels = Record<string, string | number>;
