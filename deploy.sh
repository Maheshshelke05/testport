#!/bin/bash
# ============================================
# deploy.sh — Run this every time you push code
# Usage: bash deploy.sh
# ============================================

echo "======================================"
echo "  Deploying CloudBuild..."
echo "======================================"

# Pull latest code
git pull origin main

# Rebuild and restart containers
docker compose up -d --build --force-recreate

# Remove old images
docker image prune -f

echo ""
echo "======================================"
echo "  Deploy complete!"
echo "  https://cloudbuild.tech"
echo "======================================"
