### Mono-repo for Traders of the League board game

This is not a fancy monorepo built with Nx, Lerna or anything like that. Intention is to allow central version control and shared Typescript contracts between the services, while keeping the deployment simple.

## frontend

React front-end boostrapped with Vite.js.

- Run `npm install`
- Create `.env.development`and `.env.production` with a `VITE_URL` variable pointing to the location of the gameserver (e.g., `localhost:4000` when you're developing)
- Run `npm run dev` to fire up the development server

## gameserver

Node.JS with Express and Socket.IO server that handles communication, storage / database management and the game engine.
You also need access to a mongodb database.

For development purposes:

- Run `./start_dh.sh` from the monorepo root directory. This will pull, build and start a Docker container with the latest mongo image. Note: You need Docker Desktop installed (or similar).
- Run `npm install`
- Create `.env` file with a `DB_STRING_LOCAL` variable pointing at your local mongo image. The string should be of format `mongodb://<user>:<password>@localhost:5000/traderdb?authSource=admin&readPreference=primary&ssl=false`. The user and password are defined in the `docker-compose-db.yml` file in the root.
- Run `npm run dev`

For production, you need to point the server to a proper MongoDB instance. I use MongoDB.com (atlas). Spin it up, then add a `DB_STRING` to the same `.env` file which points to that service.

## monitor

React front-end bootstrapped with Vite.js that just pulls some simple metrics from the gameserver to show activity.

## shared

Directory that holds shared Typescript typings across the services.

### To deploy you run, from the root directory (you need the fly.io credentials of course):

- `fly deploy --dockerfile ./frontend/Dockerfile --config ./frontend/fly.toml`
- `fly deploy --dockerfile ./gameserver/Dockerfile --config ./gameserver/fly.toml`
- Or just use `./deploy.sh` with `gameserver` or `frontend` as second argument
