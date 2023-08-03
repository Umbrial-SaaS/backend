#!/bin/bash

# Stop all servers and start the server as a daemon


cd ..
cd ..
cd ..
cd ..
cd /home/ubuntu/backend-umbriel

sudo npm run build

sudo pm2 restart dist/shared/infra/http/server.js --name node_umbrial


