# Dockerfile
FROM node:20.11.1

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main"]
