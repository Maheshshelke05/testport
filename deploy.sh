#!/bin/bash
set -e

echo "======================================"
echo "  Deploying CloudBuild..."
echo "======================================"

git pull origin main

sudo docker-compose up -d --build --force-recreate
sudo docker image prune -f

echo ""
echo "======================================"
echo "  Deploy complete!"
echo "  https://cloudbuild.tech"
echo "======================================"
