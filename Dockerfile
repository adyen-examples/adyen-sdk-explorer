# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /adyen-web-demo
COPY . .
RUN npm install

CMD ["npm", "run", "build"]

EXPOSE 8080