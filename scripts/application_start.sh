#!/bin/bash

# Stop all servers and start the server as a daemon


cd ..
cd ..
cd ..
cd ..
cd /home/ubuntu/backend-umbriel

sudo npm run build
npx prisma migrate deploy
sudo pm2 start dist/shared/infra/http/server.js


