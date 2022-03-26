FROM node:16-alpine

WORKDIR /shared

COPY /shared/ .

WORKDIR /gameserver

COPY /gameserver/package*.json .

RUN npm install

COPY /gameserver/ .

RUN npm run build

ENV PORT=4000

EXPOSE 4000

CMD ["npm", "run", "start"]