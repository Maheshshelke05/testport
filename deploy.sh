#!/bin/bash
set -e

echo "======================================"
echo "  Deploying CloudBuild..."
echo "======================================"

git pull origin main

# Rebuild images
sudo docker build -t cloudbuild_admin ./admin
sudo docker build -t cloudbuild_frontend .

# Restart containers
sudo docker stop cloudbuild_admin cloudbuild_frontend 2>/dev/null || true
sudo docker rm cloudbuild_admin cloudbuild_frontend 2>/dev/null || true

sudo docker run -d \
  --name cloudbuild_admin \
  --network app_network \
  --restart unless-stopped \
  --env-file .env \
  -v admin_uploads:/app/public/uploads \
  -v admin_data:/app/data \
  cloudbuild_admin

sudo docker run -d \
  --name cloudbuild_frontend \
  --network app_network \
  --restart unless-stopped \
  cloudbuild_frontend

sudo docker image prune -f

echo ""
echo "======================================"
echo "  Deploy complete! https://cloudbuild.tech"
echo "======================================"
