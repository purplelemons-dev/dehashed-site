FROM node:20.10.0-bookworm-slim

WORKDIR /app

COPY package.json /app

RUN npm i

COPY . /app

CMD [ "npm", "run", "dev2"]
