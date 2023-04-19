<h1 align="center" style="font-size:50px; align=center;">NestJS Bootstrap</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Abstract
This repository intends to expose a template for deploying NestJS application with useful tools.

You can find a full documentation about NestJS on the [Official Website](https://docs.nestjs.com/)

# Components

This skeleton should propose the following elements:
- A manageable and configurable **logging** service
- A manageable and configurable **metric** service (based on prometheus)
- Built-in interceptors and middlewares (exception handlers, logging interceptors, authenticators, etc)

# NestJS implementation description

## Installation

```bash
npm install
```

## Servers

Two servers are running simultaneously on different ports:

- `app-server` for the application (default port: 3000)
- `metrics-server` for application metrics, exposing `/metrics` route (default port: 9999)

## Running the app

The project can be executed with the following commands:

```bash
npm run start             # Default nest start
npm run start:watch       # Running in watch mode
npm run start:debug       # Running in debug mode
npm run start:prod        # Running in production mode against dist folder
```

We can also provide the following parameters to npm scripts to define the environment file to import:

```bash
npm start \
  --env=dev \
  --region=use1
# Will use the env file 'env/use1.dev.env'
```
### Run with Docker

```bash
./scripts/run-docker.sh
```

This script allows to run the app inside a docker container.

All parameters are defined in [Dockerfile](Dockerfile) and in [docker-compose.yaml](docker-compose.yaml).

We can provide to this script the following arguments

- `--watch`: run the app in watch mode
- `--build`: rebuild the containers before running
- `--lport`: localhost port the dockerized app should listen on (default 3000)
- `--mport`: localhost port for metrics server (default 9999)
- `--env` : environment file path to run with
- `--region` : region to run

Example:

```bash
./scripts/run-docker.sh \
    --watch # run in watch mode
    --build # force build
    --lport=8000 # localhost port
    --env=dev
    --region=euc1
```

### NPM Script for docker

We can use pre edited npm script for running inside docker with standard configuration.

```bash
npm run start:docker:dev
```

## Tools

### Logging System

We decided to use `pino` as our logging library. You can see documentation here: https://github.com/pinojs/pino

Some environment variables can be used to configure the output logs:

| Env Name | Description | Default value |
| ---------|-------------|---------------|
| `LOG_LEVEL`|define minimum level of log to display | `info` |
| `LOG_PRETTIFY` | enable prettifying of logs for local development |`false`|
|`LOG_EXCLUDED_PATHS`| to disable automatic logging of specific paths | {{empty}} |

To use the logger in a module, you should first import it using the following syntax:

```typescript
@Module({
  imports: [PinoLoggerModule.forRoot({ context: SomeModule.name, service: Services.APP })],
  providers: [SomeService],
})
export class SomeModule {}

export class SomeService {
  constructor(private readonly logger: PinoLoggerService) {
    this.logger.error('Instantiated SomeService');
  }
}
```

When using it, the logs will display like this (with other fields if configured):

```log
{"level":"error","time":1680171663274,"pid":81715,"hostname":"local","service":"app","context":"AppModule","message":"Instantiated AppController"}
```

A `LoggerInterceptor` has already been defined and is responsible of logging at every start and end of each request.

### Metrics

In the directory [src/metrics](src/metrics) we expose a Metric System which rely on the [@promster](https://github.com/tdeekens/promster) library.

Some environment variables could/should be used to configure the metrics:

| Env Name | Description | Default value |
| ---------|-------------|---------------|
| `METRICS_PORT` | on which port listen metrics server | 9999 |
| `METRICS_PREFIX` | how to prefix each generated metric | {{empty}} |

Here is an explanation of how to use it properly.

A `MetricsServerModule` allow to expose the route `/metrics` to display all the metrics. This route is available on a separate port (specific for metrics and not publicly accessible).

See in [main.ts](src/main.ts)

```typescript
async function bootstrapMetricsApp() {
  const app = await NestFactory.create<NestFastifyApplication>(
    MetricsServerModule,
    new FastifyAdapter(getAppFastifyInstance()),
    {
      logger: false,
    },
  );
  await app.listen(appConfig.metricsConfig.metricsPort, '0.0.0.0');
}
```

To use the metrics inside our codebase, we imported the `MetricsStoreModule` as a global module in [src/app/app.module.ts](src/app/app.module.ts)

```typescript
@Module({
  imports: [
    RouterModule.register(routes), 
    MetricsStoreModule.register({ store: AllMetrics }), 
    ApiModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClsMiddleware).forRoutes('*');
  }
}
```

This module is a dynamic module (see NestJS documentation) which allows you to configure the available metrics for the app. All the metrics can be defined in the file [src/metrics/metrics.ts](src/metrics/metrics.ts) as the exported variable `AllMetrics`

```typescript
export const AllMetrics: Record<MetricNames, PrometheusMetric> = {
  //  Counters
  [MetricNames.SAMPLE_COUNTER]: buildCounter({
    name: MetricNames.SAMPLE_COUNTER,
  }),

  //  Gauges
  [MetricNames.SAMPLE_GAUGE]: buildGauge({
    name: MetricNames.SAMPLE_GAUGE,
    help: 'Custom help for gauge sample',
    labelNames: ['status'],
  }),

  //  Histograms
  [MetricNames.SAMPLE_HISTOGRAM]: buildHistogram({
    name: MetricNames.SAMPLE_HISTOGRAM,
    buckets: [0.5, 0.6, 0.7],
  }),

  //  Summaries
  [MetricNames.SAMPLE_SUMMARY]: buildSummary({
    name: MetricNames.SAMPLE_SUMMARY,
    labelNames: ['status'],
    percentiles: [0.5, 0.6, 0.7],
  }),
};
```

To use the metrics inside a service or a controller, you should first add a `MetricsStoreService` as a class field and then use the following methods:
- `inc`: for `Gauge` and `Counter` to increment
- `dec`: for `Gauge` to decrement
- `observe`: for `Histogram` and `Summary` to observe a specific value
- `createTimer`: for logging times

The `TimerMetric` class expose the following methods
- `constructor`: to create an instance out of an Histogram or Summary
- `start`: to start the timer
- `stop`: to stop the timer
