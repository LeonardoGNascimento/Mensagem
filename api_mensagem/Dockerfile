FROM node

ENV TZ=America/Sao_Paulo

WORKDIR /app/api

COPY ./package-lock.json .

COPY ./package.json .

RUN npm install

COPY . .

CMD npm run start:dev