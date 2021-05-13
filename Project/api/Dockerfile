FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run populate

EXPOSE 8010
CMD [ "npm", "start" ]