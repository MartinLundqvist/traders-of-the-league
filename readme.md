### Mono-repo for Traders of the League board game

### To deploy you run, from the root directory:

- `fly deploy --dockerfile ./frontend/Dockerfile --config ./frontend/fly.toml`
- `fly deploy --dockerfile ./gameserver/Dockerfile --config ./gameserver/fly.toml`
- Or just use `./deploy.sh` with `gameserver` or `frontend` as second argument
