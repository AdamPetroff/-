FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g prisma ts-node

COPY . .

EXPOSE 3000

CMD ["npm", "start"]