export interface IAppConfiguration {
  nodeEnv: string;
  appPort: number;

  logConfig: ILoggingConfiguration;

  metricsConfig: MetricsConfiguration;
}

export interface ILoggingConfiguration {
  logLevel: string;
  prettify: boolean;
  excludedPaths: string[];
}

export type MetricsConfiguration = {
  metricsPort: number;
  metricsPrefix: string;
};
