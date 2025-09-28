#!/bin/bash

# Task Feed Assignment Cleanup Script
# This script cleans up the development environment

echo "🧹 Cleaning up Task Feed Assignment environment..."

# Stop and remove PostgreSQL container
echo "📦 Stopping and removing PostgreSQL container..."
docker stop postgres-taskfeed 2>/dev/null || true
docker rm postgres-taskfeed 2>/dev/null || true

# Remove node_modules to save space
echo "📦 Removing node_modules directories..."
rm -rf backend/node_modules
rm -rf frontend/node_modules

echo "✅ Cleanup complete!"
echo ""
echo "To restart the environment:"
echo "1. Run './setup.sh' to set up everything again"
echo "2. Or manually start PostgreSQL and run 'npm install' in both directories"
