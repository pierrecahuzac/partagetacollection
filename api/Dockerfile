FROM node:22-alpine3.22

WORKDIR /usr/src/api

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci --only=dev

RUN npm i -g nodemon

COPY . .

RUN npx prisma generate

CMD ["nodemon", "server.js"]