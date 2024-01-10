FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .
COPY .env /usr/app/.env
RUN npx prisma db push

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]