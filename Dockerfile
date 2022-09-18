FROM node:18-bullseye-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# External libraries
RUN apt-get update
RUN apt-get install -y curl

EXPOSE 3000
EXPOSE 9999

CMD ["npm", "start"]
