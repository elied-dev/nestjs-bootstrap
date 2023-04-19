import { AppConfiguration } from './config.types';

import { join } from 'path';
import { config as dotenvConfig } from 'dotenv';

export class ConfigFactory {
  public static config: AppConfiguration = null;
}
//  retrieve env file only for dev purpose
const importEnvironmentVariables = () => {
  const { npm_config_region, npm_config_env } = process.env;

  const region = npm_config_region ? npm_config_region + '.' : '';
  const env = npm_config_env || 'production';

  const envFileName = `${region}${env}.env`;
  const envFileDirectory = __dirname + '/../../../env';

  dotenvConfig({
    path: join(envFileDirectory, envFileName),
  });
};

const getConfig = (): AppConfiguration => {
  importEnvironmentVariables();
  if (ConfigFactory.config === null) {
    ConfigFactory.config = {
      nodeEnv: process.env.NODE_ENV || 'production',
      appPort: Number(process.env.APP_PORT || process.env.PORT) || 3000,

      logConfig: {
        logLevel: process.env.LOG_LEVEL || 'info',
        prettify: process.env.LOG_PRETTIFY === 'true',
        excludedPaths: (process.env.LOG_EXCLUDED_PATHS || '').split(',').filter((s) => s),
      },

      metricsConfig: {
        metricsPort: Number(process.env.METRICS_PORT) || 9999,
        metricsPrefix: process.env.METRICS_PREFIX || '',
      },
    };
  }
  return ConfigFactory.config;
};

export const appConfig = getConfig();
