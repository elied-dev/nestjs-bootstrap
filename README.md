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

## Run with Docker

```bash
./scripts/run-docker.sh
```

This script allows to run the app inside a docker container.

All parameters are defined in [Dockerfile](Dockerfile) and in [docker-compose.yaml](docker-compose.yaml).

We can provide to this script the following arguments

- `--watch`: run the app in watch mode
- `--build`: rebuild the containers
- `--lport`: localhost port the dockerized app should listen on (default 3000)
- `--env` : environment to run
- `--region` : region to run

Example:

```bash
./scripts/run-docker.sh \
    --watch # run in watch mode
    --build # force build
    --cport=4002 # container internal port
    --lport=8000 # localhost port
    --file="new-docker.yaml" # docker compose file config
```

## Stay in touch

| Name                                      | Github Profile                                                                                                                                                                                                                             | Roles                 |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| [Elie Drai](https://github.com/elied-dev) | [<a href="https://github.com/elied-dev" target="blank"><img align="center" src="https://avatars.githubusercontent.com/u/106579448?s=400&u=00677ff0b4eba6a517bea6bc9ac2cf37e46c4d78&v=4" height="100" /></a>](https://github.com/elied-dev) | ADMIN <br>CONTRIBUTOR |

## License

Nest Starter is [MIT licensed](LICENSE).
