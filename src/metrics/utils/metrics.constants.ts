enum CounterMetric {
  HEALTH_REQUEST,
}
enum GaugeMetric {}
enum TimerMetric {}
enum HistogramMetric {}

const config = [
  {
    enumMetric: CounterMetric,
    suffix: 'counter',
  },
  {
    enumMetric: GaugeMetric,
    suffix: 'gauge',
  },
  {
    enumMetric: TimerMetric,
    suffix: 'timer',
  },
  {
    enumMetric: HistogramMetric,
    suffix: 'histogram',
  },
];

const createObject = (metricEnum: any, suffix: string) => {
  return Object.fromEntries(
    Object.keys(metricEnum)
      .filter((key) => isNaN(parseInt(key)))
      .map((key) => [key, `${key.toLowerCase()}_${suffix}`]),
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
