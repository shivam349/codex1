#!/bin/bash

echo "🔍 Verifying Render Deployment Status..."
echo "=========================================="
echo ""

# Check root endpoint
echo "1️⃣ Checking root endpoint..."
ROOT_MSG=$(curl -s https://codex1-nq28.onrender.com/ | grep -o '"message":"[^"]*"' | cut -d'"' -f4)
echo "   Message: $ROOT_MSG"

if [[ "$ROOT_MSG" == *"Updated"* ]]; then
  echo "   ✅ Backend is UPDATED"
else
  echo "   ❌ Backend is OLD VERSION - needs redeploy"
fi
echo ""

# Check health endpoint
echo "2️⃣ Checking health endpoint..."
HEALTH=$(curl -s https://codex1-nq28.onrender.com/api/status)
echo "   Response: $HEALTH"
echo ""

# Check auth endpoint
echo "3️⃣ Checking auth endpoint..."
AUTH=$(curl -s -X POST https://codex1-nq28.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test","password":"test"}')
echo "   Response: $AUTH"

if [[ "$AUTH" == *"Route not found"* ]]; then
  echo "   ❌ Auth endpoint NOT FOUND - needs redeploy"
  echo ""
  echo "⚠️  ACTION REQUIRED:"
  echo "   1. Go to: https://render.com/dashboard"
  echo "   2. Select service: codex1-nq28"
  echo "   3. Click 'Manual Deploy' → 'Deploy latest commit'"
  echo "   4. Wait 5-10 minutes until status shows 'Live'"
  echo "   5. Run this script again to verify"
else
  echo "   ✅ Auth endpoint is working!"
fi

echo ""
echo "=========================================="
