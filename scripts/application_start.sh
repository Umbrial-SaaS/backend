#!/bin/bash

# Stop all servers and start the server as a daemon


cd ..
cd ..
cd ..
cd ..
cd /home/ubuntu/backend-umbriel

sudo npm run build
sudo pm2 delete all
sudo pm2 start dist/shared/infra/http/server.js
sudo pm2 save


