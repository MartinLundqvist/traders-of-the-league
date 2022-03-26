#!/bin/bash

# add 'gameserver' or 'frontend' as the second argument

echo "Deploying $1"

fly deploy --dockerfile ./$1/Dockerfile --config ./$1/fly.toml