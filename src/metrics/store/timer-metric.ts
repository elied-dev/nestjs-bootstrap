import { Prometheus } from '@promster/metrics';
import { MetricLabels } from './metrics-store.dto';

/**
 * Represents a timer metric for measuring elapsed time.
 */
export class TimerMetric {
  /**
   * The function to stop the timer and return the elapsed time, once it is started.
   *
   * @param {MetricLabels} [labels] - Optional labels to associate with the timer. Default is undefined.
   * @returns {number} The elapsed time in seconds.
   */
  stop: (labels?: MetricLabels) => number = null;

  /**
   * Creates a new instance of TimerMetric associated with the specified metric.
   *
   * @param {Prometheus.Histogram | Prometheus.Summary} metric - The Prometheus histogram or summary metric to associate with the timer.
   */
  constructor(private metric: Prometheus.Histogram | Prometheus.Summary) {}

  /**
   * Starts the timer with optional labels.
   *
   * @param {MetricLabels} [labels={}] - Optional labels to associate with the timer. Default is an empty object.
   */
  start(labels: MetricLabels = {}) {
    if (!this.stop) {
      this.stop = this.metric.startTimer(labels);
    }
  }
}
