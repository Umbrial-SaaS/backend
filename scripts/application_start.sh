#!/bin/bash

# Stop all servers and start the server as a daemon


cd ..
cd ..
cd ..
cd ..
cd /home/ubuntu/backend-umbriel
git config --global --add safe.directory /home/ubuntu/backend-umbriel
git pull
sudo npm install 
sudo npm run build
sudo pm2 delete all
sudo pm2 start dist/shared/infra/http/server.js
pm2 startup
sudo pm2 save


