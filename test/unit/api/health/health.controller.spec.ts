import { AppStatus, HealthController } from 'src/api/health/health.controller';
import { HealthService } from 'src/api/health/health.service';

describe('Testing health services', () => {
  let healthController: HealthController;
  let healthService: HealthService;

  beforeEach(() => {
    healthService = new HealthService();
    healthController = new HealthController(healthService);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe('Check health', () => {
    it('should succeed in checking health', async () => {
      expect(await healthController.getHealth()).toMatchObject({
        status: AppStatus.OK,
        message: 'App is healthy',
      });
    });

    it('should fail in checking health status', async () => {
      jest.spyOn(healthService, 'isHealthy').mockReturnValue(Promise.resolve(false));
      try {
        await healthController.getHealth();
        //  make the test fail if the call succeeded
        expect(true).toBeFalsy();
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });

  describe('Check liveness', () => {
    it('should succeed in checking liveness', async () => {
      expect(await healthController.getLiveness()).toMatchObject({
        status: AppStatus.OK,
        message: 'App is live',
      });
    });

    it('should fail in checking liveness status', async () => {
      jest.spyOn(healthService, 'isLive').mockReturnValue(Promise.resolve(false));

      try {
        await healthController.getLiveness();
        //  make the test fail if the call succeeded
        expect(true).toBeFalsy();
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });

  describe('Check readiness', () => {
    it('should succeed in checking readiness', async () => {
      expect(await healthController.getReadiness()).toMatchObject({
        status: AppStatus.OK,
        message: 'App is ready',
      });
    });

    it('should fail in checking readiness status', async () => {
      jest.spyOn(healthService, 'isReady').mockReturnValue(Promise.resolve(false));

      try {
        await healthController.getReadiness();
        //  make the test fail if the call succeeded
        expect(true).toBeFalsy();
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });
});
