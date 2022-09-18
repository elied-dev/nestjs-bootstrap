enum MetricTypes {
  COUNTER = 'counter',
  GAUGE = 'gauge',
  HISTOGRAM = 'histogram',
  SUMMARY = 'summary',
}

const assignLabels = (
  metricObject: { [x: string]: string },
  suffix: string,
) => {
  Object.keys(metricObject).forEach((key: string) => {
    metricObject[key] = `${metricObject[key].toLowerCase()}_${suffix}`;
  });
};

const Counters: { [x: string]: string } = {
  PING: '',
};
assignLabels(Counters, 'counter');

const Gauges: { [x: string]: string } = {};
assignLabels(Gauges, 'gauges');

const Timers: { [x: string]: string } = {};
assignLabels(Timers, 'timers');

const Histograms: { [x: string]: string } = {};
assignLabels(Histograms, 'histogram');

export { Counters, Gauges, Timers, Histograms, MetricTypes };
