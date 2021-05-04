FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

EXPOSE 3000

ENV NODE_ENV=development

RUN npm install -g @nestjs/cli

RUN npm install

#COPY . .

#COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]
