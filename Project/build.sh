#!/usr/bin/env bash
echo y | docker system prune
docker build . --tag ssin/node-web-app