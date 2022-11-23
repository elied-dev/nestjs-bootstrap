import { TimerMetric } from './utils/metrics.timer.ts';
import { CustomMetrics, MetricDetails, MetricTypes } from './utils/metrics.types';
import { appConfig } from './../config/index';
import { getSummary, Prometheus } from '@promster/metrics';

import { MetricLogger } from 'src/common/logger/pino.logger';
import { metricsBuilders, metricsDefinition } from './utils/metrics.config';

export class MetricsService {
  private static metricsPrefix = appConfig.metricsConfig.metricsPrefix;
  private static _customMetrics: CustomMetrics = undefined;
  private static logger = MetricLogger.logger.child({
    service: MetricsService.name,
  });

  async getMetrics() {
    return getSummary();
  }

  public static getCustomMetrics(): CustomMetrics {
    if (!this._customMetrics) {
      this._customMetrics = Object.fromEntries(
        metricsDefinition.map((metric) => {
          const builder = metricsBuilders[metric.type];
          return [
            metric.name,
            {
              metric: builder(metric.name, metric.properties),
              type: metric.type,
              name: metric.name,
            },
          ];
        }),
      );
    }
    return this._customMetrics;
  }

  private static getMetric(name: string): MetricDetails {
    const metricInfo = this.getCustomMetrics()[name];
    this.checkExistsMetric(metricInfo, name);
    return metricInfo;
  }

  private static checkExistsMetric(metricDetails: MetricDetails, name: string) {
    if (!metricDetails) {
      throw new Error('Metric ' + name + ' not found');
    }
  }

  private static checkMetricType(metricDetails: MetricDetails, types: MetricTypes[]) {
    if (!types.includes(metricDetails.type)) {
      throw new Error(
        'Metric ' + metricDetails.name + ' type is ' + metricDetails.type + ' and should be one of ' + types.join(', '),
      );
    }
  }

  public static async inc(metricName: string, labels: Record<string, any> = {}) {
    try {
      const metricDetails = this.getMetric(metricName);
      this.checkMetricType(metricDetails, [MetricTypes.COUNTER, MetricTypes.GAUGE]);
      this.logger.debug('Incremented metric: ' + metricName);
      (metricDetails.metric as Prometheus.Gauge | Prometheus.Counter).inc(labels);
    } catch (error) {
      const { message } = error;
      this.logger.error({ error: { message } }, 'Failed to increment metric: ' + metricName);
    }
  }

  public static async dec(metricName: string, labels: Record<string, any> = {}) {
    try {
      const metricDetails = this.getMetric(metricName);
      this.checkMetricType(metricDetails, [MetricTypes.GAUGE]);
      this.logger.debug('Decremented metric: ' + metricName);
      (metricDetails.metric as Prometheus.Gauge).dec(labels);
    } catch (error) {
      const { message } = error;
      this.logger.error({ error: { message } }, 'Failed to decrement metric: ' + metricName);
    }
  }

  public static startTimer(metricName: string, labels: Record<string, any> = {}) {
    try {
      const metricDetails = this.getMetric(metricName);
      this.checkMetricType(metricDetails, [MetricTypes.HISTOGRAM]);
      this.logger.debug('Started timer: ' + metricName);
      return new TimerMetric(metricDetails.metric as Prometheus.Histogram, {
        startImmediately: true,
        labels,
      });
    } catch (error) {
      const { message } = error;
      this.logger.error({ error: { message } }, 'Failed to start timer metric: ' + metricName);
    }
    return TimerMetric.DummyTimer;
  }

  public static stopTimer(timerMetric: TimerMetric, labels: Record<string, any> = {}) {
    try {
      timerMetric.stop(labels);
    } catch (error) {
      const { message } = error;
      this.logger.error({ error: { message } }, 'Failed to stop timer');
    }
    return TimerMetric.DummyTimer;
  }
}
