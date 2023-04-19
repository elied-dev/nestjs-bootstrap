FROM node:18-bullseye-slim

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

ENV NODE_ENV production
WORKDIR /usr/app
COPY --chown=node:node . /usr/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Main App Port
EXPOSE ${APP_PORT}
# Metrics port
EXPOSE ${METRICS_PORT}

RUN npm run build
USER node

# provide direct command instead of npm
# node dist/src/main
CMD ["dumb-init", "node", "dist/src/main"]
