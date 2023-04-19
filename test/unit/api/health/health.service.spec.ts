import { HealthService } from 'src/api/health/health.service';

describe('Testing health services', () => {
  let healthService: HealthService;

  beforeEach(() => {
    healthService = new HealthService();
  });

  it('should be healthy', async () => {
    expect(await healthService.isHealthy()).toBeTruthy();
  });

  it('should be live', async () => {
    expect(await healthService.isLive()).toBeTruthy();
  });

  it('should be ready', async () => {
    expect(await healthService.isReady()).toBeTruthy();
  });
});
