#!/bin/bash

# Stop all servers and start the server as a daemon


cd ..
cd ..
cd ..
cd ..
cd /app/pandoris-backend

sudo npm run build
sudo pm2 start dist/shared/infra/http/server.js
