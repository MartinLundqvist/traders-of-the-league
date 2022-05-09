FROM node:16-alpine

WORKDIR /shared

COPY /shared/ .

WORKDIR /monitor

COPY /monitor/package*.json .

RUN npm install

COPY /monitor/ .

RUN npm run build

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "start"]