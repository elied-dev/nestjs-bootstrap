import { AppLogger } from './../../common/logger/pino.logger';
import { Prometheus } from '@promster/metrics';
import { MetricLabels } from './metrics.types';

export type TimerMetricOptions = {
  startImmediately?: boolean;
  labels?: MetricLabels;
};

export class TimerMetric {
  private isRunning = false;
  private startTime: bigint = process.hrtime.bigint();
  private endTime: bigint = null;
  private durationTime: bigint = null;
  private endTimer: (labels?: Partial<MetricLabels>) => number = null;

  constructor(
    private metric: Prometheus.Histogram,
    options: TimerMetricOptions,
  ) {
    if (options.startImmediately) {
      this.begin(options.labels || {});
    }
  }

  public begin(labels: MetricLabels) {
    try {
      this.isRunning = true;
      this.endTimer = this.metric.startTimer(labels);
    } catch (e: any) {
      AppLogger.debug(e);
    }
  }

  public stop(labels: MetricLabels = {}) {
    try {
      this.endTimer(labels);
      this.isRunning = false;
      this.endTime = process.hrtime.bigint();
      this.durationTime = this.endTime - this.startTime;

      return Number(this.durationTime / 1000000n); // Nanoseconds to Milliseconds
    } catch (e: any) {
      AppLogger.debug(e);
    }
    return null;
  }

  public static DummyTimer: { begin: any; stop: any } = {
    // dummy timer for error handling
    begin: (): any => null,
    stop: (): any => null,
  };
}
