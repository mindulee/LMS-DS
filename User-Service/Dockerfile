FROM node:alpine

WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm", "start"]