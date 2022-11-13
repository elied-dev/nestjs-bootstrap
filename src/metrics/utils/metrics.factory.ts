import { Prometheus } from '@promster/metrics';
import { metricsGlobalConfig } from './metrics.config';
import { MetricBuilderFunction, MetricProperties, MetricTypes } from './metrics.types';

const getDefaultHelpDescription = (metricType: MetricTypes, name: string, isTimerMetric = false) =>
  isTimerMetric ? `${name} ${metricType.toLowerCase()} timer in seconds.` : `${metricType.toLowerCase()} for ${name}.`;

const defaultLabels = ['event', 'success'];

const buildCounter: MetricBuilderFunction = (
  name: string,
  properties: MetricProperties,
  metricsPrefix: string,
): Prometheus.Counter => {
  const { labels: metricLabels = [], help: metricHelp = null } = properties;

  const labelNames = [...defaultLabels, ...new Set([...metricLabels])];
  const help = metricHelp ? metricHelp : getDefaultHelpDescription(MetricTypes.COUNTER, name);

  return new Prometheus.Counter({
    name: `${metricsPrefix}${name}`,
    labelNames,
    help,
  });
};

const buildGauge: MetricBuilderFunction = (
  name: string,
  properties: MetricProperties,
  metricsPrefix: string,
): Prometheus.Gauge => {
  const { labels: metricLabels = [], help: metricHelp = null } = properties;

  const labelNames = [...defaultLabels, ...new Set([...metricLabels])];

  const help = metricHelp ? metricHelp : getDefaultHelpDescription(MetricTypes.GAUGE, name);

  return new Prometheus.Gauge({
    name: `${metricsPrefix}${name}`,
    labelNames,
    help,
  });
};

const buildHistogram: MetricBuilderFunction = (
  name: string,
  properties: MetricProperties,
  metricsPrefix: string,
): Prometheus.Histogram => {
  const {
    labels: metricLabels = [],
    buckets: metricBuckets = null,
    help: metricHelp = null,
    isTimerMetric = true,
  } = properties;

  const labelNames = [...defaultLabels, ...new Set([...metricLabels])];

  const buckets = metricBuckets ? metricBuckets : metricsGlobalConfig.buckets;
  const help = metricHelp ? metricHelp : getDefaultHelpDescription(MetricTypes.HISTOGRAM, name, isTimerMetric);

  return new Prometheus.Histogram({
    name: `${metricsPrefix}${name}`,
    labelNames,
    buckets,
    help,
  });
};

const buildSummary: MetricBuilderFunction = (
  name: string,
  properties: MetricProperties,
  metricsPrefix: string,
): Prometheus.Summary => {
  const {
    labels: metricLabels = [],
    percentiles: metricPercentiles,
    help: metricHelp = null,
    isTimerMetric = true,
  } = properties;

  const labelNames = [...defaultLabels, ...new Set([...metricLabels])];

  const percentiles = metricPercentiles || metricsGlobalConfig.percentiles;
  const help = metricHelp ? metricHelp : getDefaultHelpDescription(MetricTypes.HISTOGRAM, name, isTimerMetric);

  return new Prometheus.Summary({
    name: `${metricsPrefix}${name}`,
    labelNames,
    percentiles,
    help,
  });
};

export { buildCounter, buildHistogram, buildGauge, buildSummary };
