FROM node:18-bullseye-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

# External libraries
RUN apt-get update
RUN apt-get install -y curl \
  tar bzip2 zip curl vim git wget \
  sysvinit-utils procps htop

EXPOSE 3000
EXPOSE 9999

RUN npm run build
CMD ["npm", "run", "start:prod"]
