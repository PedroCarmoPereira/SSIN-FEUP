#!/usr/bin/env bash
docker rmi ssin/node-web-app
docker build . --tag ssin/node-web-app