### Deployment

- Create a Dockerfile for each of the packages
- Run the Docker build from the root folder to set the build context as the root folder
- Check this link for information about deploying from monorepo to Fly [link](https://fly.io/docs/reference/monorepo/)

### To deploy you run, from the root directory:

- `fly deploy --dockerfile ./frontend/Dockerfile --config ./frontend/fly.toml`
- `fly deploy --dockerfile ./gameserver/Dockerfile --config ./gameserver/fly.toml`
- Or just use `./deploy.sh` with `gameserver` or `frontend` as second argument
