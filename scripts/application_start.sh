#!/bin/bash

# Stop all servers and start the server as a daemon

pwd
cd /backend-umbriel

sudo npm run build
sudo pm2 start dist/shared/infra/http/server.js
