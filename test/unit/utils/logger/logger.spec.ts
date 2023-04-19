import { pinoLoggerOptions } from 'src/utils/logger/pino-logger.config';
import { PinoLoggerService } from 'src/utils/logger/pino-logger.service';

describe('Test for log functions', () => {
  const testLogger = new PinoLoggerService();

  it('should test several functions', () => {
    testLogger.log(1);
    testLogger.info(1);
    testLogger.error(1);
    testLogger.warn(1);
    testLogger.debug([1]);
    testLogger.verbose('1');
  });

  it('should test log formatter', () => {
    expect(pinoLoggerOptions.formatters.log({ test: 123 })).toEqual({ test: 123 });
  });

  it('should test addProperties', () => {
    testLogger.addProperties({ test: 123 });
  });
});
