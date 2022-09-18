<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Nest framework TypeScript starter repository.

This unofficial starter intends to improve the [official starter code](https://github.com/nestjs/nest) by adding in it some useful tools.

## Installation

```bash
npm install
```

## Servers

Two servers are running simultaneously on different ports:

- app-server for the application (default port: 3000)
- metrics-server for application metrics, exposing `getMetricsSummary` route (default port: 9999)

## Run configuration

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
  --env=dev
  --region=use1
# Will use the env file 'env/use1.dev.env'
```

## Run with Docker

```bash
./scripts/run-docker.sh
```

This script allows to run the app inside a docker container.

All parameters are defined in [Dockerfile](Dockerfile) and in [docker-compose.yaml](docker-compose.yaml).

We can provide to this script the following arguments

- `--watch`: run the app in watch mode
- `--build`: rebuild the containers before running
- `--lport`: localhost port the dockerized app should listen on (default 3000)
- `--env` : environment to run
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

## Stay in touch

| Name                                      | Github Profile                                                                                                                                                                                                                             | Roles                 |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| [Elie Drai](https://github.com/elied-dev) | [<a href="https://github.com/elied-dev" target="blank"><img align="center" src="https://avatars.githubusercontent.com/u/106579448?s=400&u=00677ff0b4eba6a517bea6bc9ac2cf37e46c4d78&v=4" height="100" /></a>](https://github.com/elied-dev) | ADMIN <br>CONTRIBUTOR |

## License

Nest Starter is [MIT licensed](LICENSE).
