#!/bin/bash
cd ..
cd ..
cd /home/ubuntu/backend-umbriel
sudo npm install
npx prisma migrate deploy
