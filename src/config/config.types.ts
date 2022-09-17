export interface IAppConfiguration {
  nodeEnv: string;
  appPort: number;

  logConfig: ILoggingConfiguration;
}

export interface ILoggingConfiguration {
  logLevel: string;
  prettify: boolean;
  excludedPaths: string[];
}
