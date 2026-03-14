#!/bin/bash
set -e

echo "======================================"
echo "  Step 1: Install docker-compose"
echo "======================================"
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version

echo "======================================"
echo "  Step 2: Start Docker daemon"
echo "======================================"
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user

echo "======================================"
echo "  Step 3: Create .env"
echo "======================================"
cat > .env << 'EOF'
GMAIL_USER=shivam.garud2011@gmail.com
GMAIL_APP_PASSWORD=tqpsbkrqnfoojopu
ADMIN_EMAIL=shivam.garud2011@gmail.com
WHATSAPP_LINK=https://wa.me/917709646107
PORT=3001
EOF

echo "======================================"
echo "  Step 4: Build and start containers"
echo "======================================"
sudo docker-compose up -d --build

echo ""
echo "======================================"
echo "  Done! Check: http://16.171.154.28"
echo "======================================"
