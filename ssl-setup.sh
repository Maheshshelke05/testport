#!/bin/bash
# ============================================
# SSL Setup — Run AFTER server-setup.sh
# ============================================

DOMAIN="cloudbuild.tech"
EMAIL="shivam.garud2011@gmail.com"

echo "======================================"
echo "  Step 1: Start HTTP only (for certbot)"
echo "======================================"

# Temp nginx config — HTTP only for certbot challenge
cat > nginx-proxy.conf << 'EOF'
server {
    listen 80;
    server_name cloudbuild.tech www.cloudbuild.tech admin.cloudbuild.tech;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 200 'OK';
        add_header Content-Type text/plain;
    }
}
EOF

# Start only nginx for certbot challenge
docker compose up -d nginx

echo "Waiting for nginx..."
sleep 5

echo "======================================"
echo "  Step 2: Get SSL Certificate"
echo "======================================"

docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email \
  -d $DOMAIN \
  -d www.$DOMAIN \
  -d admin.$DOMAIN

echo "======================================"
echo "  Step 3: Restore full nginx config"
echo "======================================"

# Restore the real nginx config with SSL
cp nginx-proxy.conf.bak nginx-proxy.conf 2>/dev/null || true

echo "======================================"
echo "  Step 4: Start all containers"
echo "======================================"

docker compose up -d --build

echo ""
echo "======================================"
echo "  DONE! Your site is live at:"
echo "  https://cloudbuild.tech"
echo "  https://admin.cloudbuild.tech"
echo "======================================"
