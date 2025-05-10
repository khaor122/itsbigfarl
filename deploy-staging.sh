#!/bin/bash

# ============================================
# Deploy Script for BigFarl - Staging Server
# ============================================

echo "🚀 Starting deployment to staging server..."

# 1. Pull latest changes (if you're using Git)
git pull origin staging

# 2. Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# 3. Build the project
echo "🏗 Building project..."
pnpm run build

# 4. Restart server using PM2
echo "🔁 Restarting app with PM2..."
pm2 delete bigfarl-staging || true  # Ignore error if process doesn't exist
pm2 start "pnpm run start" --name bigfarl-staging

# 5. Save PM2 process list (auto boot after server restart)
pm2 save

# 6. Done!
echo "✅ Deployment complete! BigFarl Staging is live. 🎉"
