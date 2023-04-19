import { appConfig } from '../../config/index';
import { LoggerOptions, TransportSingleOptions } from 'pino';

const transport: TransportSingleOptions = appConfig.logConfig.prettify
  ? {
      target: 'pino-pretty',
      options: {
        colorize: true,
        singleLine: true,
        levelFirst: true,
        translateTime: true,
        messageKey: 'message',
      },
    }
  : {
      target: 'pino/file',
      options: {
        destination: 1,
      },
    };

const pinoLoggerOptions: LoggerOptions = {
  enabled: !process.env.LOGS_DISABLED,
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
