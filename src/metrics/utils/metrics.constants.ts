import { appConfig } from './../../config/index';
enum CounterMetric {
  HEALTH_REQUEST,
}
enum GaugeMetric {}
enum TimerMetric {}
enum HistogramMetric {}

const config = [
  {
    enumMetric: CounterMetric,
    suffix: '_counter',
  },
  {
    enumMetric: GaugeMetric,
    suffix: '_gauge',
  },
  {
    enumMetric: TimerMetric,
    suffix: '_timer',
  },
  {
    enumMetric: HistogramMetric,
    suffix: '_histogram',
  },
];

const createObject = (metricEnum: any, suffix: string) => {
  return Object.fromEntries(
    Object.keys(metricEnum)
      .filter((key) => isNaN(parseInt(key)))
      .map((key) => [key, `${appConfig.metricsConfig.metricsPrefix}${key.toLowerCase()}${suffix}`]),
  );
};

const [Counters, Gauges, Timers, Histograms] = config.map(({ enumMetric, suffix }) =>
  createObject(enumMetric, suffix),
) as [
  Record<keyof typeof CounterMetric, string>,
  Record<keyof typeof GaugeMetric, string>,
  Record<keyof typeof TimerMetric, string>,
  Record<keyof typeof HistogramMetric, string>,
];

export { Counters, Gauges, Timers, Histograms };
