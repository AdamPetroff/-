FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --silent

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "dev"]