import { appConfig } from './../../config/index';
import { MetricTypes } from './metrics.types';
enum CounterMetric {
  HEALTH_REQUEST,
}
enum GaugeMetric {}
enum TimerMetric {}
enum HistogramMetric {}

const config = [
  {
    enumMetric: CounterMetric,
    suffix: `_${MetricTypes.COUNTER}`,
  },
  {
    enumMetric: GaugeMetric,
    suffix: `_${MetricTypes.GAUGE}`,
  },
  {
    enumMetric: TimerMetric,
    suffix: `_timer`,
  },
  {
    enumMetric: HistogramMetric,
    suffix: `_${MetricTypes.HISTOGRAM}`,
  },
];

const createObject = (metricEnum: any, suffix: string) => {
  return Object.fromEntries(
    Object.keys(metricEnum)
      .filter((key) => isNaN(parseInt(key)))
      .map((key) => [key, `${appConfig.metricsConfig.metricsPrefix}${key.toLowerCase()}${suffix}`]),
  );
};

const metricNamesBuilder = config.map(({ enumMetric, suffix }) => createObject(enumMetric, suffix)) as [
  Record<keyof typeof CounterMetric, string>,
  Record<keyof typeof GaugeMetric, string>,
  Record<keyof typeof TimerMetric, string>,
  Record<keyof typeof HistogramMetric, string>,
];

const [Counters, Gauges, Timers, Histograms] = metricNamesBuilder;

export { Counters, Gauges, Timers, Histograms };
