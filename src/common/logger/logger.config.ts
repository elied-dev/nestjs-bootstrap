import { appConfig } from '../../config/index';
import { LoggerOptions } from 'pino';

const transport = appConfig.logConfig.prettify
  ? {
      target: 'pino-pretty',
      options: {
        colorize: true,
        singleLine: true,
        levelFirst: true,
        translateTime: true,
      },
    }
  : {
      target: 'pino/file',
      options: {
        destination: 1,
      },
    };

const pinoLoggerOptions: LoggerOptions = {
  safe: true,
  level: appConfig.logConfig.logLevel,
  messageKey: 'message',
  nestedKey: 'payload',
  transport,
  formatters: {
    level: (level: string) => ({ level }),
    log: (x: Record<string, unknown>) => x,
    bindings: (bindings) => ({
      pid: bindings.pid,
      hostname: bindings.hostname,
    }),
  },
  redact: [],
  serializers: {},
};

export { pinoLoggerOptions };
