#!/bin/bash
set -e

DOMAIN="maheshbhau.xyz"
EMAIL="your@email.com"
DIR=$(pwd)

echo ""
echo "╔══════════════════════════════════════╗"
echo "║   maheshbhau.xyz — One Command Run   ║"
echo "╚══════════════════════════════════════╝"
echo ""

# ── Step 1: Install Docker if not present ──
if ! command -v docker &>/dev/null; then
  echo "▶ Installing Docker..."
  if [ -f /etc/system-release ] && grep -qi 'amazon linux' /etc/system-release; then
    sudo yum install -y docker
    sudo systemctl start docker
    sudo systemctl enable docker
  else
    curl -fsSL https://get.docker.com | sh
  fi
  sudo usermod -aG docker $USER
  echo "✅ Docker installed"
else
  echo "✅ Docker already installed"
fi

# ── Step 2: Stop old containers ──
echo "▶ Stopping old containers..."
sudo docker stop mahesh_nginx mahesh_frontend mahesh_admin 2>/dev/null || true
sudo docker rm   mahesh_nginx mahesh_frontend mahesh_admin 2>/dev/null || true
sudo docker rmi  mahesh_frontend mahesh_admin 2>/dev/null || true

# ── Step 3: Create network & volumes ──
echo "▶ Creating network & volumes..."
sudo docker network create app_network 2>/dev/null || true
sudo docker volume create admin_uploads 2>/dev/null || true
sudo docker volume create admin_data    2>/dev/null || true
sudo docker volume create certbot_www   2>/dev/null || true
sudo docker volume create certbot_certs 2>/dev/null || true

# ── Step 4: Build images ──
echo "▶ Building Admin image..."
sudo docker build -t mahesh_admin ./admin

echo "▶ Building Frontend image..."
sudo docker build -t mahesh_frontend .

# ── Step 5: Start Admin & Frontend ──
echo "▶ Starting Admin server..."
sudo docker run -d \
  --name mahesh_admin \
  --network app_network \
  --restart unless-stopped \
  --env-file $DIR/.env \
  -v admin_uploads:/app/public/uploads \
  -v admin_data:/app/data \
  mahesh_admin

echo "▶ Starting Frontend..."
sudo docker run -d \
  --name mahesh_frontend \
  --network app_network \
  --restart unless-stopped \
  mahesh_frontend

# ── Step 6: SSL Certificate ──
CERT_PATH="/var/lib/docker/volumes/certbot_certs/_data/live/$DOMAIN/fullchain.pem"

if [ -f "$CERT_PATH" ]; then
  echo "✅ SSL certificate already exists — skipping"
else
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  Getting SSL Certificate for $DOMAIN"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "  NOTE: Certbot will ask you to add TXT"
  echo "  records in your domain DNS settings."
  echo "  Add them and press Enter when done."
  echo ""

  sudo docker run -it --rm \
    -v certbot_certs:/etc/letsencrypt \
    -v certbot_www:/var/www/certbot \
    certbot/certbot certonly \
    --manual \
    --preferred-challenges dns \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN \
    -d admin.$DOMAIN

  echo "✅ SSL certificate obtained!"
fi

# ── Step 7: Start Nginx ──
echo "▶ Starting Nginx..."

if [ -f "$CERT_PATH" ]; then
  NGINX_CONF="$DIR/nginx-proxy.conf"
  echo "✅ Using HTTPS config"
else
  cat > /tmp/nginx-fallback.conf << 'EOF'
server {
    listen 80;
    server_name _;

    location /api/ {
        proxy_pass http://mahesh_admin:3001/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /uploads/ {
        proxy_pass http://mahesh_admin:3001/uploads/;
        proxy_set_header Host $host;
    }

    location / {
        proxy_pass http://mahesh_frontend:80;
        proxy_set_header Host $host;
    }
}
EOF
  NGINX_CONF="/tmp/nginx-fallback.conf"
  echo "⚠️  No SSL cert — running HTTP only (run again after SSL)"
fi

sudo docker run -d \
  --name mahesh_nginx \
  --network app_network \
  --restart unless-stopped \
  -p 80:80 \
  -p 443:443 \
  -v $NGINX_CONF:/etc/nginx/conf.d/default.conf:ro \
  -v certbot_www:/var/www/certbot \
  -v certbot_certs:/etc/letsencrypt \
  nginx:alpine

# Cleanup
sudo docker image prune -f 2>/dev/null || true

sleep 2

echo ""
echo "╔══════════════════════════════════════╗"
sudo docker ps --format "  ║ {{.Names}} → {{.Status}}"
echo "╚══════════════════════════════════════╝"
echo ""

if [ -f "$CERT_PATH" ]; then
  echo "  🌐  https://$DOMAIN"
  echo "  🔧  https://admin.$DOMAIN"
else
  echo "  🌐  http://$(curl -s ifconfig.me 2>/dev/null || echo 'YOUR_SERVER_IP')"
  echo "  ⚠️   Run ./start.sh again after SSL setup"
fi
echo ""
