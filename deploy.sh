#!/bin/bash
set -e

DOMAIN="cloudbuild.tech"
EMAIL="shivam.garud2011@gmail.com"
DIR="/home/ec2-user/digital-launchpad"

cd $DIR

echo "======================================"
echo "  [1/6] Pull latest code"
echo "======================================"
git pull origin main

echo "======================================"
echo "  [2/6] Stop old containers"
echo "======================================"
sudo docker stop cloudbuild_nginx cloudbuild_frontend cloudbuild_admin 2>/dev/null || true
sudo docker rm   cloudbuild_nginx cloudbuild_frontend cloudbuild_admin 2>/dev/null || true

echo "======================================"
echo "  [3/6] Build images"
echo "======================================"
sudo docker build -t cloudbuild_admin    ./admin
sudo docker build -t cloudbuild_frontend .

echo "======================================"
echo "  [4/6] Start Admin + Frontend"
echo "======================================"
sudo docker network create app_network 2>/dev/null || true
sudo docker volume create admin_uploads 2>/dev/null || true
sudo docker volume create admin_data    2>/dev/null || true
sudo docker volume create certbot_www   2>/dev/null || true
sudo docker volume create certbot_certs 2>/dev/null || true

sudo docker run -d \
  --name cloudbuild_admin \
  --network app_network \
  --restart unless-stopped \
  --env-file $DIR/.env \
  -v admin_uploads:/app/public/uploads \
  -v admin_data:/app/data \
  cloudbuild_admin

sudo docker run -d \
  --name cloudbuild_frontend \
  --network app_network \
  --restart unless-stopped \
  cloudbuild_frontend

echo "======================================"
echo "  [5/6] Get SSL Certificate"
echo "======================================"

# Start nginx HTTP only for certbot challenge
cat > /tmp/nginx-http.conf << 'NGINXEOF'
server {
    listen 80;
    server_name _;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 200 'ok';
        add_header Content-Type text/plain;
    }
}
NGINXEOF

sudo docker run -d \
  --name cloudbuild_nginx \
  --network app_network \
  --restart no \
  -p 80:80 -p 443:443 \
  -v /tmp/nginx-http.conf:/etc/nginx/conf.d/default.conf \
  -v certbot_www:/var/www/certbot \
  -v certbot_certs:/etc/letsencrypt \
  nginx:alpine

sleep 3

# Get certificate (skip if already exists)
if [ ! -f "/var/lib/docker/volumes/certbot_certs/_data/live/$DOMAIN/fullchain.pem" ]; then
  sudo docker run --rm \
    -v certbot_www:/var/www/certbot \
    -v certbot_certs:/etc/letsencrypt \
    certbot/certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN \
    -d admin.$DOMAIN
  echo "SSL certificate obtained!"
else
  echo "SSL certificate already exists, skipping..."
fi

echo "======================================"
echo "  [6/6] Start Nginx with HTTPS"
echo "======================================"
sudo docker stop cloudbuild_nginx && sudo docker rm cloudbuild_nginx

sudo docker run -d \
  --name cloudbuild_nginx \
  --network app_network \
  --restart unless-stopped \
  -p 80:80 -p 443:443 \
  -v $DIR/nginx-proxy.conf:/etc/nginx/conf.d/default.conf \
  -v certbot_www:/var/www/certbot \
  -v certbot_certs:/etc/letsencrypt \
  nginx:alpine

sleep 2
sudo docker ps

echo ""
echo "======================================"
echo "  LIVE at https://$DOMAIN"
echo "  Admin: https://admin.$DOMAIN"
echo "======================================"
