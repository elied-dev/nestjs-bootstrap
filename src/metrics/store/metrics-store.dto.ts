import { Prometheus } from '@promster/metrics';

export type MetricsStoreOptions = {
  store: MetricsStoreObject;
};

export type PrometheusMetric = Prometheus.Counter | Prometheus.Gauge | Prometheus.Histogram | Prometheus.Summary;
export type MetricsStoreObject = Record<string, PrometheusMetric>;
export type MetricLabels = Record<string, number | string>;

export type StoreOperationOptions = {
  labels?: MetricLabels;
  value?: number;
};
