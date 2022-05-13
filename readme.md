### Mono-repo for Traders of the League board game

This is not a fancy monorepo built with Nx, Lerna or anything like that. Intention is to allow central version control and shared Typescript contracts between the services, while keeping the deployment simple.

## frontend

React front-end boostrapped with Vite.js.

- Run `npm install`
- Create `.env.development`and `.env.production` with a `VITE_URL` variable pointing to the location of the gameserver (e.g., `localhost:4000` when you're developing)
- Run `npm run dev` to fire up the development server

## gameserver

Node.JS with Express and Socket.IO server that handles communication, storage and the game engine

- Run `npm install`
- Run `npm run dev`

## monitor

React front-end boo tstrapped with Vite.js that just pulls some simple metrics from the gameserver to show activity.

## shared

Directory that holds shared Typescript typings across the services.

### To deploy you run, from the root directory (you need the fly.io credentials of course):

- `fly deploy --dockerfile ./frontend/Dockerfile --config ./frontend/fly.toml`
- `fly deploy --dockerfile ./gameserver/Dockerfile --config ./gameserver/fly.toml`
- Or just use `./deploy.sh` with `gameserver` or `frontend` as second argument
