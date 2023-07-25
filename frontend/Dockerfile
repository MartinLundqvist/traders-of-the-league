FROM node:18-alpine

WORKDIR /shared

COPY /shared/ .

WORKDIR /frontend

COPY /frontend/package*.json .

RUN npm install

COPY /frontend/ .

RUN npm run build

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "start"]