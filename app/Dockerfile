
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

COPY . . 

RUN npm install

RUN npm run build 

FROM node:20-alpine AS production

ENV NODE_ENV production
EXPOSE 3000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/main"]