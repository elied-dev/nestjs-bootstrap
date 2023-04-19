import { Injectable, NotFoundException } from '@nestjs/common';
import { MetricNames } from 'src/metrics/metrics';
import { MetricsStoreService } from 'src/metrics/store/metrics-store.service';
import { sleep } from 'src/utils';
import { PinoLoggerService } from 'src/utils/logger/pino-logger.service';
import { v4 } from 'uuid';

@Injectable()
export class SampleService {
  constructor(private readonly logger: PinoLoggerService, private readonly metricStore: MetricsStoreService) {}
  samples: any[] = [
    {
      id: 'xxx',
      name: 'Hello World',
    },
  ];

  async getAllSamples(): Promise<any[]> {
    this.metricStore.inc(MetricNames.SAMPLE_COUNTER);
    this.metricStore.dec(MetricNames.SAMPLE_GAUGE, { labels: { status: 'success' } });
    this.metricStore.inc(MetricNames.SAMPLE_GAUGE, { labels: { status: 'failure' } });
    this.metricStore.observe(MetricNames.SAMPLE_HISTOGRAM, 0.56);
    this.metricStore.observe(MetricNames.SAMPLE_SUMMARY, 0.67, { labels: { status: 'failure' } });

    const timer = this.metricStore.createTimer(MetricNames.SAMPLE_SUMMARY);
    timer.start();
    await sleep(2000);
    timer.stop({ status: 'success' });

    return this.samples;
  }

  getSampleById(id: string): any {
    const sample = this.samples.find((s) => s.id === id);
    if (sample === undefined) {
      throw new NotFoundException(`Not found sample with id ${id}`);
    }
    return sample;
  }

  createSample(sample: any) {
    const id = v4();
    this.samples.push({ id, ...sample });
    return { id, ...sample };
  }
}
