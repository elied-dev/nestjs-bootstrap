import { IAppConfiguration } from './config.types';

import { join } from 'path';
import { config as dotenvConfig } from 'dotenv';

export class ConfigFactory {
  public static config: IAppConfiguration = null;
}
//  retrieve env file
const importEnvironmentVariables = () => {
  let { npm_config_region: region, npm_config_env: env } = Object.fromEntries(
    Object.keys(process.env)
      .filter((key) => key.startsWith('npm_config'))
      .map((key) => [key, process.env[key]]),
  );

  region = region ? region + '.' : '';
  env = env ? env : 'production';

  const envFileName = `${region}${env}.env`;
  const envFileDirectory = __dirname + '/../../env';

  dotenvConfig({
    path: join(envFileDirectory, envFileName),
  });
};

const getConfig = (): IAppConfiguration => {
  importEnvironmentVariables();
  if (ConfigFactory.config === null) {
    ConfigFactory.config = {
      nodeEnv: process.env.NODE_ENV || 'production',
      appPort: Number(process.env.APP_PORT) || 3000,
    };
  }
  return ConfigFactory.config;
};

export const appConfig = getConfig();
