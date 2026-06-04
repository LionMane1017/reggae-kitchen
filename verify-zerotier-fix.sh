#!/bin/bash

# ZeroTier Fix Verification Script
# Run this after logging out and back in to verify the fix works

echo "🔍 ZeroTier Fix Verification Script"
echo "=================================="
echo ""

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check 1: Verify group membership in current session
echo "📋 Check 1: Verifying group membership in current session..."
if id | grep -q "zerotier-one"; then
    echo -e "${GREEN}✓ PASS${NC}: zerotier-one group is active in current session"
    id | grep zerotier-one
else
    echo -e "${RED}✗ FAIL${NC}: zerotier-one group is NOT active in current session"
    echo "You need to log out and log back in for the group membership to take effect."
    exit 1
fi
echo ""

# Check 2: Verify user is in zerotier-one group
echo "📋 Check 2: Verifying user is in zerotier-one group..."
if groups $USER | grep -q "zerotier-one"; then
    echo -e "${GREEN}✓ PASS${NC}: User $USER is in zerotier-one group"
else
    echo -e "${RED}✗ FAIL${NC}: User $USER is NOT in zerotier-one group"
    echo "Run: sudo usermod -aG zerotier-one $USER"
    exit 1
fi
echo ""

# Check 3: Test ZeroTier CLI access
echo "📋 Check 3: Testing ZeroTier CLI access..."
if zerotier-cli info > /dev/null 2>&1; then
    echo -e "${GREEN}✓ PASS${NC}: ZeroTier CLI is accessible"
    zerotier-cli info
else
    echo -e "${RED}✗ FAIL${NC}: ZeroTier CLI is not accessible"
    echo "Error: $(zerotier-cli info 2>&1)"
    exit 1
fi
echo ""

# Check 4: Verify ZeroTier service status
echo "📋 Check 4: Verifying ZeroTier service status..."
if systemctl is-active --quiet zerotier-one; then
    echo -e "${GREEN}✓ PASS${NC}: ZeroTier service is running"
    systemctl status zerotier-one --no-pager -l | head -n 5
else
    echo -e "${RED}✗ FAIL${NC}: ZeroTier service is not running"
    echo "Run: sudo systemctl start zerotier-one"
    exit 1
fi
echo ""

# Check 5: Verify file permissions
echo "📋 Check 5: Verifying ZeroTier file permissions..."
AUTHTOKEN_PERM=$(stat -c %a /var/lib/zerotier-one/authtoken.secret 2>/dev/null)
IDENTITY_PERM=$(stat -c %a /var/lib/zerotier-one/identity.secret 2>/dev/null)

if [ "$AUTHTOKEN_PERM" = "660" ] && [ "$IDENTITY_PERM" = "660" ]; then
    echo -e "${GREEN}✓ PASS${NC}: File permissions are correct (660)"
    echo "  authtoken.secret: $AUTHTOKEN_PERM"
    echo "  identity.secret: $IDENTITY_PERM"
else
    echo -e "${YELLOW}⚠ WARNING${NC}: File permissions may not be optimal"
    echo "  authtoken.secret: $AUTHTOKEN_PERM (expected: 660)"
    echo "  identity.secret: $IDENTITY_PERM (expected: 660)"
fi
echo ""

# Final summary
echo "=================================="
echo -e "${GREEN}✓ ALL CHECKS PASSED!${NC}"
echo ""
echo "🚀 You can now launch the ZeroTier GUI:"
echo "   zerotier-gui"
echo ""
echo "Or access it from your application menu."
