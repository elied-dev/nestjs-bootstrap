import { Prometheus } from '@promster/metrics';

type MetricProperties = {
  labels: string[];
  help: string;
  buckets?: number[];
  isTimerMetric?: boolean;
  percentiles?: number[];
};

type PrometheusMetric = Prometheus.Counter | Prometheus.Gauge | Prometheus.Histogram | Prometheus.Summary;

type CustomMetrics = Record<string, MetricDetails>;

type MetricDetails = {
  metric: PrometheusMetric;
  type: MetricTypes;
  name: string;
};

type MetricDefinition = {
  name: string;
  type: MetricTypes;
  properties: MetricProperties;
};

type MetricBuilderFunction = (name: string, properties: MetricProperties, metricsPrefix: string) => PrometheusMetric;

enum MetricTypes {
  COUNTER = 'counter',
  HISTOGRAM = 'histogram',
  GAUGE = 'gauge',
  SUMMARY = 'summary',
}

type MetricLabels = Record<string, string | number>;

export {
  MetricLabels,
  MetricTypes,
  MetricBuilderFunction,
  MetricDefinition,
  MetricDetails,
  CustomMetrics,
  PrometheusMetric,
  MetricProperties,
};
