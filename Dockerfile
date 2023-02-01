FROM node:18-bullseye-slim

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000
EXPOSE 9999



RUN npm run build

# provide direct command instead of npm
# node dist/src/main
USER node
CMD ["dumb-init", "node", "dist/src/main"]
