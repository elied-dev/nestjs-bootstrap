const assignLabels = (
  metricObject: { [x: string]: string },
  suffix: string,
) => {
  Object.keys(metricObject).forEach((key: string) => {
    metricObject[key] = `${key.toLowerCase()}_${suffix}`;
  });
};

const CountersLabels = {
  HEALTH_REQUEST: '',
};
assignLabels(CountersLabels, 'counter');

const GaugesLabels = {};
assignLabels(GaugesLabels, 'gauges');

const TimersLabels = {};
assignLabels(TimersLabels, 'timers');

const HistogramsLabels = {};
assignLabels(HistogramsLabels, 'histogram');

export { CountersLabels, GaugesLabels, TimersLabels, HistogramsLabels };
