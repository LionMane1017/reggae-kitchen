#!/bin/bash
# =========================================================================
# 👑 REGGAE KITCHEN: VPS DEPLOYMENT AUTOMATION
# =========================================================================
set -e

VPS_IP="3.98.151.231"
SSH_KEY="/home/neo/ANTIGRAVITY WORK FOLDERS/AI/LightsailDefaultKey-ca-central-1.pem"
REMOTE_USER="ubuntu"
LOCAL_DIR="/home/neo/ANTIGRAVITY WORK FOLDERS/Reggae Kitchen"

echo "⚡ Starting high-fidelity deployment to CyberPanel VPS ($VPS_IP)..."

# 1. Create remote staging folder
echo "📂 Creating remote staging directory..."
ssh -o StrictHostKeyChecking=no -i "$SSH_KEY" $REMOTE_USER@$VPS_IP "mkdir -p /home/ubuntu/reggae_kitchen_temp"

# 2. Upload assets to staging folder
echo "📤 Uploading files to VPS staging area..."
scp -i "$SSH_KEY" \
    "$LOCAL_DIR/reggae_kitchen_corporate_lore.html" \
    "$LOCAL_DIR/index.legacy.html" \
    "$LOCAL_DIR/server.js" \
    "$LOCAL_DIR/package.json" \
    "$LOCAL_DIR/package-lock.json" \
    "$LOCAL_DIR/.env" \
    $REMOTE_USER@$VPS_IP:/home/ubuntu/reggae_kitchen_temp/

# 3. Perform remote installations and updates via sudo
echo "⚙️  Executing secure server-side installation tasks..."
ssh -i "$SSH_KEY" $REMOTE_USER@$VPS_IP << 'EOF'
set -e

# Target site details
SITE_USER="regga7504"
SITE_GROUP="regga7504"
SITE_DIR="/home/reggaekitchen.com"
SERVER_DIR="$SITE_DIR/server"

ORG_USER="regga1034"
ORG_GROUP="regga1034"
ORG_DIR="/home/reggaekitchen.org"
ORG_PUBLIC_HTML="$ORG_DIR/public_html"

CA_USER="regga9779"
CA_GROUP="regga9779"
CA_DIR="/home/reggaekitchen.ca"
CA_PUBLIC_HTML="$CA_DIR/public_html"

ONLINE_USER="regga5964"
ONLINE_GROUP="regga5964"
ONLINE_DIR="/home/reggaekitchen.online"
ONLINE_PUBLIC_HTML="$ONLINE_DIR/public_html"

echo "🚀 Setting up directories..."
sudo mkdir -p "$SERVER_DIR"
sudo chown $SITE_USER:$SITE_GROUP "$SITE_DIR"
sudo chown $SITE_USER:$SITE_GROUP "$SERVER_DIR"

echo "📦 Transferring reggae_kitchen_corporate_lore.html to reggaekitchen.org public_html..."
sudo cp /home/ubuntu/reggae_kitchen_temp/reggae_kitchen_corporate_lore.html "$ORG_PUBLIC_HTML/index.html"
sudo chown $ORG_USER:$ORG_GROUP "$ORG_PUBLIC_HTML/index.html"
sudo chmod 644 "$ORG_PUBLIC_HTML/index.html"

echo "📦 Transferring index.legacy.html to reggaekitchen.ca public_html..."
sudo cp /home/ubuntu/reggae_kitchen_temp/index.legacy.html "$CA_PUBLIC_HTML/index.html"
sudo chown $CA_USER:$CA_GROUP "$CA_PUBLIC_HTML/index.html"
sudo chmod 644 "$CA_PUBLIC_HTML/index.html"

echo "📦 Transferring index.legacy.html to reggaekitchen.online public_html..."
sudo cp /home/ubuntu/reggae_kitchen_temp/index.legacy.html "$ONLINE_PUBLIC_HTML/index.html"
sudo chown $ONLINE_USER:$ONLINE_GROUP "$ONLINE_PUBLIC_HTML/index.html"
sudo chmod 644 "$ONLINE_PUBLIC_HTML/index.html"

echo "📦 Transferring server files..."
sudo cp /home/ubuntu/reggae_kitchen_temp/server.js "$SERVER_DIR/"
sudo cp /home/ubuntu/reggae_kitchen_temp/package.json "$SERVER_DIR/"
sudo cp /home/ubuntu/reggae_kitchen_temp/package-lock.json "$SERVER_DIR/"
sudo cp /home/ubuntu/reggae_kitchen_temp/.env "$SERVER_DIR/"

# Update PORT to 3005 in remote .env to prevent port conflict
sudo sed -i 's/^PORT=.*/PORT=3005/' "$SERVER_DIR/.env"

# Grant 755 permissions temporarily so root and user can traverse
sudo chown -R $SITE_USER:$SITE_GROUP "$SERVER_DIR"
sudo chmod -R 755 "$SERVER_DIR"

echo "🔋 Installing production npm packages on VPS..."
cd "$SERVER_DIR"
# Run npm install as the site user with /bin/bash shell explicitly, ignoring nologin settings
sudo -u $SITE_USER -s /bin/bash -c "npm install --production"

echo "🛡️ Creating systemd service for TTS Proxy..."
cat << 'SERVICE' | sudo tee /etc/systemd/system/reggae-kitchen-tts.service > /dev/null
[Unit]
Description=Reggae Kitchen Secure TTS Proxy Server
After=network.target

[Service]
User=regga7504
Group=regga7504
WorkingDirectory=/home/reggaekitchen.com/server
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=5
Environment=PORT=3005
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
SERVICE

echo "🌀 Reloading systemd and starting TTS Proxy daemon..."
sudo systemctl daemon-reload
sudo systemctl enable reggae-kitchen-tts.service
sudo systemctl restart reggae-kitchen-tts.service
sudo systemctl status reggae-kitchen-tts.service --no-pager

echo "🛡️ Updating OpenLiteSpeed configurations..."
for DOMAIN in reggaekitchen.ca reggaekitchen.org reggaekitchen.online; do
    VHOST_CONF="/usr/local/lsws/conf/vhosts/$DOMAIN/vhost.conf"
    if [ -f "$VHOST_CONF" ]; then
        # Remove existing context if it exists to make script re-runnable/idempotent
        sudo sed -i '/extprocessor reggaeTtsBackend/,/}/d' "$VHOST_CONF"
        sudo sed -i '/context \/api\/tts/,/}/d' "$VHOST_CONF"

        # Construct OLS proxy snippet
        PROXY_SNIPPET=$(cat << 'SNIPPET'
extprocessor reggaeTtsBackend {
  type                    proxy
  address                 http://127.0.0.1:3005
  maxConns                100
  pcKeepAliveTimeout      60
  initTimeout             60
  retryTimeout            0
  respBuffer              0
}

context /api/tts {
  type                   proxy
  handler                reggaeTtsBackend
  addDefaultCharset      off
}
SNIPPET
)
        # Insert proxy rules before the rewrite rules
        sudo perl -i -pe 'print "'"$PROXY_SNIPPET"'\n\n" if /^rewrite\s*\{/ && ! $inserted++' "$VHOST_CONF"
    fi
done

echo "🧹 Purging OpenLiteSpeed cache for domains..."
sudo rm -rf /usr/local/lsws/cachedata/reggaekitchen.ca/*
sudo rm -rf /usr/local/lsws/cachedata/reggaekitchen.org/*
sudo rm -rf /usr/local/lsws/cachedata/reggaekitchen.online/*

echo "🌀 Restarting OpenLiteSpeed to apply changes..."
sudo /usr/local/lsws/bin/lswsctrl restart

echo "🧹 Cleaning up temp staging directory..."
rm -rf /home/ubuntu/reggae_kitchen_temp

echo "🎉 Server-side configuration complete!"
EOF

echo "🏆 Deployment fully complete!"
