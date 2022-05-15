#!/bin/bash

echo "Starting development mongo database"

docker-compose -f docker-compose-db.yml --log-level DEBUG up --detach