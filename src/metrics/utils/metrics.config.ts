import { CountersLabels } from './metrics.constants';
import {
  buildCounter,
  buildHistogram,
  buildGauge,
  buildSummary,
} from './metrics.factory';
import {
  MetricBuilderFunction,
  MetricDefinition,
  MetricTypes,
} from './metrics.types';

export const metricsGlobalConfig = {
  buckets: [
    0.05, 0.1, 0.25, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.25, 1.5, 1.75, 2, 2.5, 3,
    3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 12.5, 15, 17.5, 20,
    22.5, 25, 30,
  ],
  percentiles: [0.5, 0.75, 0.9, 0.95, 0.98, 0.99, 0.999],
};

export const metricsDefinition: MetricDefinition[] = [
  //  COUNTERS
  {
    name: CountersLabels.HEALTH_REQUEST,
    type: MetricTypes.COUNTER,
    properties: {
      help: 'Counter for health requests',
      labels: [],
    },
  },
];

export const metricsBuilders: Record<MetricTypes, MetricBuilderFunction> = {
  [MetricTypes.COUNTER]: buildCounter,
  [MetricTypes.HISTOGRAM]: buildHistogram,
  [MetricTypes.GAUGE]: buildGauge,
  [MetricTypes.SUMMARY]: buildSummary,
};
