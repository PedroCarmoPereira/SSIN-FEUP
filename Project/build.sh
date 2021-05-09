#!/usr/bin/env bash

docker build . -t ssin/node-web-app
docker run -p 49160:4500 -d ssin/node-web-app