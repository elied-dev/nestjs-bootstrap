import { Injectable } from '@nestjs/common';
import { MetricsStoreObject, PrometheusMetric, StoreOperationOptions } from './metrics-store.dto';
import { Prometheus } from '@promster/metrics';
import { TimerMetric } from './timer-metric';
import { PinoLoggerService } from 'src/utils/logger/pino-logger.service';

@Injectable()
export class MetricsStoreService {
  constructor(private readonly store: MetricsStoreObject) {}

  public get<T extends PrometheusMetric>(name: string): T {
    const metric = this.store[name] as T;
    if (metric === undefined) {
      throw new Error(`Metric ${name} not found`);
    }
    return metric;
  }

  private defaultOptions = {
    labels: {},
    value: 1,
  };

  /**
   * Increments a metric by a given value or 1, with optional labels.
   *
   * @param {string} name - The name of the metric to increment.
   * @param {StoreOperationOptions} [options=this.defaultOptions] - Optional parameters for the store operation.
   * @param {object} [options.labels] - Optional labels to associate with the metric increment. Default is an empty object.
   * @param {number} [options.value] - Optional value to increment the metric by. Default is 1.
   * @returns {void}
   * @throws {Error} If an error occurs while performing the increment operation.
   */
  public inc(name: string, { labels, value }: StoreOperationOptions = this.defaultOptions): void {
    try {
      labels = labels || {};
      value = value || 1;
      this.get<Prometheus.Counter | Prometheus.Gauge>(name).inc(labels, value);
    } catch (error) {
      PinoLoggerService.MetricLogger.error(`Cannot perform operation on metric${name} due to "${error.message}"`);
    }
  }

  /**
   * Decrements a metric by a given value or 1, with optional labels.
   *
   * @param {string} name - The name of the metric to decrement.
   * @param {StoreOperationOptions} [options=this.defaultOptions] - Optional parameters for the store operation.
   * @param {object} [options.labels] - Optional labels to associate with the metric decrement. Default is an empty object.
   * @param {number} [options.value] - Optional value to decrement the metric by. Default is 1.
   * @returns {void}
   * @throws {Error} If an error occurs while performing the decrement operation.
   */
  public dec(name: string, { labels, value }: StoreOperationOptions = this.defaultOptions): void {
    try {
      labels = labels || {};
      value = value || 1;
      this.get<Prometheus.Gauge>(name).dec(labels, value);
    } catch (error) {
      PinoLoggerService.MetricLogger.error(`Cannot perform operation on metric${name} due to "${error.message}"`);
    }
  }

  /**
   * Observes a metric with a given value, with optional labels.
   *
   * @param {string} name - The name of the metric to observe.
   * @param {number} value - The value to observe for the metric.
   * @param {StoreOperationOptions} [options=this.defaultOptions] - Optional parameters for the store operation.
   * @param {object} [options.labels] - Optional labels to associate with the observed metric. Default is an empty object.
   * @returns {void}
   * @throws {Error} If an error occurs while performing the observation operation.
   */
  public observe(name: string, value: number, { labels }: StoreOperationOptions = this.defaultOptions): void {
    try {
      labels = labels || {};
      this.get<Prometheus.Histogram | Prometheus.Summary>(name).observe(labels, value);
    } catch (error) {
      PinoLoggerService.MetricLogger.error(`Cannot perform operation on metric${name} due to "${error.message}"`);
    }
  }

  /**
   * Creates a timer metric for the given name.
   *
   * @param {string} name - The name of the metric for which to create a timer.
   * @returns {TimerMetric} A TimerMetric instance associated with the specified metric name.
   */
  public createTimer(name: string): TimerMetric {
    return new TimerMetric(this.get<Prometheus.Histogram | Prometheus.Summary>(name));
  }
}
