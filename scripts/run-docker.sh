#!/bin/bash
# Check if watch mode
DOCKER_CMD="npm run start:prod"
DOCKER_COMPOSE_RUN_COMMAND="docker compose"
FORCE_BUILD=0
LOCALHOST_APP_PORT=3000
LOCALHOST_METRICS_PORT=9999
DOCKER_COMPOSE_FILE="docker-compose.yml"
ENV_FILE_NAME="dev.env"
DOCKER_COMMAND_ARGS=""

function retrieve_arg_value() {
  local arg=$1
  local VALUE=$(echo $arg | cut -d= -f2)
  return "$VALUE"
}

for argument in "$@"; do
  case $argument in
    --watch)
      DOCKER_CMD="npm run start:watch"
      ;;
    --build)
      FORCE_BUILD=1
      ;;
    *--lport=*)
      # echo $argument
      LOCALHOST_APP_PORT=$(echo $argument | cut -d= -f2)
      ;;
    *--mport=*)
      # echo $argument
      LOCALHOST_METRICS_PORT=$(echo $argument | cut -d= -f2)
      ;;
    *--env=*)
      ENV=$(echo $argument | cut -d= -f2)
      DOCKER_COMMAND_ARGS="$DOCKER_COMMAND_ARGS --env=$ENV"
      ;;
    *--region=*)
      REGION=$(echo $argument | cut -d= -f2)
      DOCKER_COMMAND_ARGS="$DOCKER_COMMAND_ARGS --region=$REGION"
      ;;
    *)
      ;;
  esac
done

export LOCALHOST_APP_PORT=$LOCALHOST_APP_PORT
export LOCALHOST_METRICS_PORT=$LOCALHOST_METRICS_PORT
export DOCKER_CMD="$DOCKER_CMD $DOCKER_COMMAND_ARGS"

DOCKER_COMPOSE_RUN_COMMAND+=" -f $DOCKER_COMPOSE_FILE"

DOCKER_COMPOSE_RUN_COMMAND+=" up"
if [ "$FORCE_BUILD" == "1" ]; then
  DOCKER_COMPOSE_RUN_COMMAND+=" --build"
fi

echo "Running docker compose: $DOCKER_COMPOSE_RUN_COMMAND"
echo "DOCKER_CMD: $DOCKER_CMD"

$DOCKER_COMPOSE_RUN_COMMAND
