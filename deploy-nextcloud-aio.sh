#!/bin/bash
# ============================================================
# NEXTCLOUD AIO DEPLOY SCRIPT
# Domain: cloud.mywisecloud.com → 99.252.115.120
# Senna Sovereign Stack — Manus Max 1.6
# ============================================================

set -e

DOMAIN="cloud.mywisecloud.com"
PUBLIC_IP="99.252.115.120"
AIO_PORT="8080"
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}🚀 NEXTCLOUD AIO DEPLOY — SOVEREIGN STACK${NC}"
echo "Domain: $DOMAIN"
echo "Public IP: $PUBLIC_IP"
echo "=================================================="

# STEP 1 — Start Docker
echo -e "\n${YELLOW}[1/5] Starting Docker daemon...${NC}"
sudo systemctl start docker
sudo systemctl enable docker
sudo systemctl is-active docker && echo -e "${GREEN}✅ Docker is running${NC}"

# STEP 2 — Open required firewall ports
echo -e "\n${YELLOW}[2/5] Opening firewall ports (80, 443, 8080, 8443)...${NC}"
sudo ufw allow 80/tcp comment 'Nextcloud HTTP' 2>/dev/null || true
sudo ufw allow 443/tcp comment 'Nextcloud HTTPS' 2>/dev/null || true
sudo ufw allow 8080/tcp comment 'Nextcloud AIO Admin' 2>/dev/null || true
sudo ufw allow 8443/tcp comment 'Nextcloud AIO Admin SSL' 2>/dev/null || true
sudo ufw allow 3478/tcp comment 'Nextcloud Talk' 2>/dev/null || true
sudo ufw allow 3478/udp comment 'Nextcloud Talk UDP' 2>/dev/null || true
echo -e "${GREEN}✅ Firewall ports opened${NC}"

# STEP 3 — Pull Nextcloud AIO image
echo -e "\n${YELLOW}[3/5] Pulling Nextcloud AIO latest image...${NC}"
sudo docker pull nextcloud/all-in-one:latest
echo -e "${GREEN}✅ Image pulled${NC}"

# STEP 4 — Stop any existing AIO container
echo -e "\n${YELLOW}[4/5] Cleaning up any existing AIO container...${NC}"
sudo docker stop nextcloud-aio-mastercontainer 2>/dev/null || true
sudo docker rm nextcloud-aio-mastercontainer 2>/dev/null || true
echo -e "${GREEN}✅ Clean slate confirmed${NC}"

# STEP 5 — Launch Nextcloud AIO Master Container
echo -e "\n${YELLOW}[5/5] Launching Nextcloud AIO...${NC}"
sudo docker run \
  --detach \
  --sig-proxy=false \
  --name nextcloud-aio-mastercontainer \
  --restart always \
  --publish 80:80 \
  --publish 8080:8080 \
  --publish 8443:8443 \
  --volume nextcloud_aio_mastercontainer:/mnt/docker-aio-config \
  --volume /var/run/docker.sock:/var/run/docker.sock:ro \
  --env APACHE_PORT=11000 \
  --env APACHE_IP_BINDING=0.0.0.0 \
  nextcloud/all-in-one:latest

echo ""
echo -e "${GREEN}=================================================="
echo "✅ NEXTCLOUD AIO DEPLOYED SUCCESSFULLY!"
echo "=================================================="
echo ""
echo "🌐 AIO Admin Interface:"
echo "   https://${DOMAIN}:8080"
echo "   https://localhost:8080"
echo "   https://${PUBLIC_IP}:8080"
echo ""
echo "📋 Next Steps in AIO Admin:"
echo "   1. Open https://${DOMAIN}:8080 in browser"
echo "   2. Accept self-signed cert warning"
echo "   3. Enter domain: ${DOMAIN}"
echo "   4. AIO will auto-provision Let's Encrypt SSL"
echo "   5. Select optional apps (Talk, Collabora, etc)"
echo "   6. Click START CONTAINERS"
echo ""
echo "⚠️  IMPORTANT — Router Port Forwarding Required:"
echo "   Forward these ports to ${PUBLIC_IP} on your router:"
echo "   80  → This machine's local IP"
echo "   443 → This machine's local IP"
echo "   8080 → This machine's local IP (AIO admin only)"
echo "   3478 → This machine's local IP (Talk/TURN)"
echo ""
echo "🔍 Check container status:"
echo "   sudo docker ps | grep nextcloud"
echo "   sudo docker logs nextcloud-aio-mastercontainer"
echo -e "==================================================${NC}"
