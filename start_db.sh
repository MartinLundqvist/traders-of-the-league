#!/bin/bash

echo "Starting development mongo database"

docker-compose -f docker-compose-db.yml up -d