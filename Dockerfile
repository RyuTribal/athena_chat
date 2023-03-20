FROM node:18-alpine AS base

WORKDIR /athena-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV PORT 3000

CMD npm run dev
