import { Injectable, LoggerService } from '@nestjs/common';
import pinoLogger, { Logger, LoggerOptions } from 'pino';
import { Context } from 'src/types/context.types';
import { Service } from 'src/types/service.types';
import { ClsKeys } from '../cls/cls.constants';
import { ClsUtils } from '../cls/cls.utils';
import { pinoLoggerOptions } from './pino-logger.config';

type CustomPinoLoggerOptions = {
  service: string;
  context?: string;
};

const PrimaryLogger = pinoLogger(pinoLoggerOptions);

@Injectable()
export class PinoLoggerService implements LoggerService {
  private logger: Logger = null;

  private service: string;
  private context: string;

  static AppLogger: PinoLoggerService = new PinoLoggerService({ service: Service.APP, context: Context.GLOBAL });
  static MetricLogger: PinoLoggerService = new PinoLoggerService({ service: Service.METRICS, context: Context.GLOBAL });

  constructor(options: CustomPinoLoggerOptions & Record<string, any> = { service: undefined, context: undefined }) {
    this.service = options.service;
    this.context = options.context;
    this.logger = PrimaryLogger.child({
      ...options,
    });
    this.child = this.logger.child;
  }

  addProperties(options: Record<string, any>): PinoLoggerService {
    return new PinoLoggerService({ service: this.service, context: this.context, ...options });
  }

  child: (
    bindings: pinoLogger.Bindings,
    options?: pinoLogger.ChildLoggerOptions,
  ) => pinoLogger.Logger<LoggerOptions & pinoLogger.ChildLoggerOptions>;

  private buildLogMessage(messageOrObject: any, optionalParams: any[]): [any, object] {
    const elementsToAdd = {
      requestId: ClsUtils.get(ClsKeys.REQUEST_ID),
    };

    if (typeof messageOrObject === 'string') {
      return [messageOrObject as any as string, elementsToAdd];
    } else if (Array.isArray(messageOrObject)) {
      return [undefined, { data: messageOrObject, ...elementsToAdd }];
    } else {
      // object
      let message = undefined;
      if (optionalParams.length > 0 && typeof optionalParams[0] === 'string') {
        message = optionalParams[0];
        return [message, { ...messageOrObject, ...elementsToAdd }];
      }
      return [messageOrObject, elementsToAdd];
    }
  }

  log(messageOrObject: any, ...optionalParams: any[]) {
    const [message, object] = this.buildLogMessage(messageOrObject, optionalParams);
    this.logger.info(object, message, ...optionalParams);
  }

  error(messageOrObject: any, ...optionalParams: any[]) {
    const [message, object] = this.buildLogMessage(messageOrObject, optionalParams);
    this.logger.error(object, message, ...optionalParams);
  }

  warn(messageOrObject: any, ...optionalParams: any[]) {
    const [message, object] = this.buildLogMessage(messageOrObject, optionalParams);
    this.logger.warn(object, message, ...optionalParams);
  }

  debug?(messageOrObject: any, ...optionalParams: any[]) {
    const [message, object] = this.buildLogMessage(messageOrObject, optionalParams);
    this.logger.debug(object, message, ...optionalParams);
  }

  info(messageOrObject: any, ...optionalParams: any[]) {
    const [message, object] = this.buildLogMessage(messageOrObject, optionalParams);
    this.logger.info(object, message, optionalParams);
  }

  verbose?(messageOrObject: any, ...optionalParams: any[]) {
    const [message, object] = this.buildLogMessage(messageOrObject, optionalParams);
    this.logger.trace(object, message, ...optionalParams);
  }
}
