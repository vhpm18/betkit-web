#!/bin/bash
# Automated deployment script for BetKit Nuxt 4 application
# Run from the project root directory

set -e

echo "🚀 BetKit Deployment Script"
echo "============================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. Check Node.js version
echo -e "${BLUE}📋 Checking environment...${NC}"
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
echo "   Node.js version: $(node -v)"

if [ "$NODE_VERSION" -lt 22 ]; then
    echo -e "${YELLOW}   ⚠️  Warning: Node.js 22+ recommended${NC}"
    echo "   💡 Run: nvm use 22"
fi

# 2. Install dependencies if needed
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.bin/nuxi" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    pnpm install
fi

# 3. Run type checking
echo -e "${BLUE}🔍 Running type checking...${NC}"
if pnpm typecheck; then
    echo -e "${GREEN}✅ Type checking passed${NC}"
else
    echo -e "${YELLOW}⚠️  Type checking found issues (non-blocking)${NC}"
fi

# 4. Run linting
echo -e "${BLUE}🧹 Running linter...${NC}"
if pnpm lint; then
    echo -e "${GREEN}✅ Linting passed${NC}"
else
    echo -e "${YELLOW}⚠️  Linting found issues (fixing)${NC}"
    pnpm lint:fix
fi

# 5. Build the application
echo -e "${BLUE}🏗️  Building application...${NC}"
if pnpm build; then
    echo -e "${GREEN}✅ Build successful!${NC}"
else
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

# 6. Show build statistics
echo -e "${BLUE}📊 Build Statistics:${NC}"
if [ -d ".output" ]; then
    SERVER_SIZE=$(du -sh .output/server 2>/dev/null | cut -f1 || echo "N/A")
    CLIENT_SIZE=$(du -sh .output/client 2>/dev/null | cut -f1 || echo "N/A")
    echo "   Server bundle: $SERVER_SIZE"
    echo "   Client bundle: $CLIENT_SIZE"
fi

# 7. Deployment options
echo ""
echo -e "${GREEN}✨ Build complete!${NC}"
echo ""
echo "📚 Deployment Options:"
echo "   1. Vercel:     pnpm deploy:vercel"
echo "   2. Preview:    pnpm preview    (local)")
echo "   3. PM2:        pm2 start ecosystem.config.js --env production"
echo "   4. Dockerfile: docker build -t betkit . && docker run -p 3000:3000 betkit"
echo ""
echo "📖 See DEPLOYMENT.md for full deployment instructions"