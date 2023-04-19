import { Prometheus } from '@promster/metrics';
import { appConfig } from 'src/config';

const defaultHelp = (metricType: string, metricName: string) => `${metricType} for metric ${metricName}`;
const defaultBuckets = [0.005, 0.01, 0.025, 0.05, 0.075, 0.1, 0.25, 0.5, 0.75, 1, 2.5, 5, 7.5, 10];
const defaultPercentiles = [0.5, 0.8, 0.9, 0.95, 0.99];
const buildMetricName = (metricName: string, metricType: 'counter' | 'gauge' | 'histogram' | 'summary') =>
  `${appConfig.metricsConfig.metricsPrefix.toLowerCase()}_${metricName.toLowerCase()}_${metricType}`;

export type MetricConfiguration = {
  name: string;
  help?: string;
  labelNames?: string[];
  buckets?: number[];
  percentiles?: number[];
};

export const buildCounter = (configuration: MetricConfiguration) =>
  new Prometheus.Counter({
    name: buildMetricName(configuration.name, 'counter'),
    help: configuration.help || defaultHelp('Counter', configuration.name),
    labelNames: configuration.labelNames || [],
  });

export const buildGauge = (configuration: MetricConfiguration) =>
  new Prometheus.Gauge({
    name: buildMetricName(configuration.name, 'gauge'),
    help: configuration.help || defaultHelp('Gauge', configuration.name),
    labelNames: configuration.labelNames || [],
  });

export const buildHistogram = (configuration: MetricConfiguration) =>
  new Prometheus.Histogram({
    name: buildMetricName(configuration.name, 'histogram'),
    help: configuration.help || defaultHelp('Histogram', configuration.name),
    labelNames: configuration.labelNames || [],
    buckets: configuration.buckets || defaultBuckets,
  });

export const buildSummary = (configuration: MetricConfiguration) =>
  new Prometheus.Summary({
    name: buildMetricName(configuration.name, 'summary'),
    help: configuration.help || defaultHelp('Summary', configuration.name),
    labelNames: configuration.labelNames || [],
    percentiles: configuration.percentiles || defaultPercentiles,
  });
