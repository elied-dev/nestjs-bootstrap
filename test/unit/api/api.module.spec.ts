import { Test, TestingModule } from '@nestjs/testing';
import { ApiModule } from 'src/api/api.module';
import { HealthModule } from 'src/api/health/health.module';
import { AllMetrics } from 'src/metrics/metrics';
import { MetricsStoreModule } from 'src/metrics/store/metrics-store.module';

describe('Test ApiModule', () => {
  it('should import ApiModule with all dependencies', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ApiModule, MetricsStoreModule.register({ store: AllMetrics })],
    }).compile();

    expect(module).toBeDefined();
    const importedModules = [HealthModule];
    importedModules.forEach((mod) => {
      expect(module.get(mod)).toBeInstanceOf(mod);
    });
  });
});
