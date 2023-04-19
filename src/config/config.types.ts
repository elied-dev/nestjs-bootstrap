export interface AppConfiguration {
  nodeEnv: string;
  appPort: number;

  logConfig: LoggingConfiguration;

  metricsConfig: MetricsConfiguration;
}

export interface LoggingConfiguration {
  logLevel: string;
  prettify: boolean;
  excludedPaths: string[];
}

export type MetricsConfiguration = {
  metricsPort: number;
  metricsPrefix: string;
};
