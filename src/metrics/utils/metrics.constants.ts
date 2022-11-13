const assignLabels = (metricObject: { [x: string]: string }, suffix: string) => {
  Object.keys(metricObject).forEach((key: string) => {
    metricObject[key] = `${key.toLowerCase()}_${suffix}`;
  });
};

const Counters = {
  HEALTH_REQUEST: '',
};
assignLabels(Counters, 'counter');

const Gauges = {};
assignLabels(Gauges, 'gauges');

const Timers = {};
assignLabels(Timers, 'timers');

const Histograms = {};
assignLabels(Histograms, 'histogram');

export { Counters, Gauges, Timers, Histograms };
