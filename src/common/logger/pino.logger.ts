import { LoggerService, LogLevel } from '@nestjs/common';
import pinoLogger, { Logger } from 'pino';
import { pinoLoggerOptions } from './logger.config';

type CustomPinoLoggerOptions = {
  context: string;
};
export class PinoLogger implements LoggerService {
  private primaryLogger = pinoLogger(pinoLoggerOptions);
  private logger: Logger = null;
  private context: string = undefined;

  constructor(options: CustomPinoLoggerOptions = { context: undefined }) {
    this.context = options.context || undefined;
    this.logger = this.primaryLogger.child({
      context: this.context,
    });
  }

  child = this.primaryLogger.child;

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, { context: this.context }, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, { context: this.context }, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, { context: this.context }, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, { context: this.context }, ...optionalParams);
  }

  info(message: any, ...optionalParams: any[]) {
    this.logger.info(message, { context: this.context }, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.trace(message, { context: this.context }, ...optionalParams);
  }

  setLogLevels?(levels: LogLevel[]) {
    throw new Error('Method not implemented.');
  }
}

export const AppLogger = new PinoLogger({ context: 'app' });
export const MetricLogger = new PinoLogger({ context: 'metrics' });
