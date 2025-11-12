#!/bin/bash

# =============================================================================
# Deployment Verification Script
# =============================================================================
# This script verifies that the application is ready for deployment
# Run this before deploying to ensure everything is configured correctly
# =============================================================================

set -e

echo "=========================================="
echo "🔍 Deployment Readiness Verification"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASS=0
WARN=0
FAIL=0

# Helper functions
pass() {
    echo -e "${GREEN}✅ PASS${NC}: $1"
    ((PASS++))
}

warn() {
    echo -e "${YELLOW}⚠️  WARN${NC}: $1"
    ((WARN++))
}

fail() {
    echo -e "${RED}❌ FAIL${NC}: $1"
    ((FAIL++))
}

echo "📋 Checking Prerequisites..."
echo "---"

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    pass "Node.js installed ($NODE_VERSION)"
else
    fail "Node.js not installed"
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    pass "npm installed ($NPM_VERSION)"
else
    fail "npm not installed"
fi

# Check Git
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    pass "Git installed ($GIT_VERSION)"
else
    fail "Git not installed"
fi

echo ""
echo "📦 Checking Dependencies..."
echo "---"

# Check if node_modules exists
if [ -d "node_modules" ]; then
    pass "Dependencies installed"
else
    warn "Dependencies not installed. Run: npm install"
fi

echo ""
echo "🔨 Checking Build Configuration..."
echo "---"

# Check Vercel config
if [ -f "vercel.json" ]; then
    pass "Root Vercel config exists"
else
    warn "Root Vercel config not found"
fi

if [ -f "apps/frontend/vercel.json" ]; then
    pass "Frontend Vercel config exists"
else
    warn "Frontend Vercel config not found"
fi

# Check Railway config
if [ -f "railway.json" ]; then
    pass "Root Railway config exists"
else
    warn "Root Railway config not found"
fi

if [ -f "apps/backend/railway.json" ]; then
    pass "Backend Railway config exists"
else
    warn "Backend Railway config not found"
fi

# Check Dockerfiles
if [ -f "apps/frontend/Dockerfile" ]; then
    pass "Frontend Dockerfile exists"
else
    warn "Frontend Dockerfile not found"
fi

if [ -f "apps/backend/Dockerfile" ]; then
    pass "Backend Dockerfile exists"
else
    warn "Backend Dockerfile not found"
fi

# Check docker-compose
if [ -f "docker-compose.yml" ]; then
    pass "docker-compose.yml exists"
else
    warn "docker-compose.yml not found"
fi

echo ""
echo "📄 Checking Environment Configuration..."
echo "---"

# Check .env.example
if [ -f ".env.example" ]; then
    pass ".env.example template exists"
else
    warn ".env.example not found"
fi

echo ""
echo "🏗️  Attempting Builds..."
echo "---"

# Try to build frontend
echo "Building frontend..."
if npm run build:frontend &> /tmp/frontend-build.log; then
    pass "Frontend builds successfully"
else
    fail "Frontend build failed. Check /tmp/frontend-build.log"
fi

# Try to build backend
echo "Building backend..."
if npm run build:backend &> /tmp/backend-build.log; then
    pass "Backend builds successfully"
else
    fail "Backend build failed. Check /tmp/backend-build.log"
fi

echo ""
echo "📚 Checking Documentation..."
echo "---"

# Check deployment docs
if [ -f "README.md" ]; then
    pass "README.md exists"
else
    warn "README.md not found"
fi

if [ -f "DEPLOYMENT_STATUS.md" ]; then
    pass "DEPLOYMENT_STATUS.md exists"
else
    warn "DEPLOYMENT_STATUS.md not found"
fi

if [ -f "DEPLOY_NOW.md" ]; then
    pass "DEPLOY_NOW.md exists"
else
    warn "DEPLOY_NOW.md not found"
fi

if [ -f "docs/README.deploy.md" ]; then
    pass "docs/README.deploy.md exists"
else
    warn "docs/README.deploy.md not found"
fi

if [ -f "docs/DEPLOYMENT_QUICK_START.md" ]; then
    pass "docs/DEPLOYMENT_QUICK_START.md exists"
else
    warn "docs/DEPLOYMENT_QUICK_START.md not found"
fi

echo ""
echo "=========================================="
echo "📊 Verification Summary"
echo "=========================================="
echo -e "${GREEN}✅ Passed: $PASS${NC}"
echo -e "${YELLOW}⚠️  Warnings: $WARN${NC}"
echo -e "${RED}❌ Failed: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}🚀 READY FOR DEPLOYMENT!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Read DEPLOY_NOW.md for quick deployment"
    echo "2. Read docs/DEPLOYMENT_QUICK_START.md for detailed guide"
    echo "3. Create Vercel and Railway accounts"
    echo "4. Deploy!"
    echo ""
    exit 0
else
    echo -e "${RED}⚠️  NOT READY FOR DEPLOYMENT${NC}"
    echo "Please fix the failed checks before deploying."
    echo ""
    exit 1
fi
