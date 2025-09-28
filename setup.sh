#!/bin/bash

# Task Feed Assignment Setup Script
# This script helps set up the development environment

echo "🚀 Setting up Task Feed Assignment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Start PostgreSQL container
echo "📦 Starting PostgreSQL container..."
docker run --name postgres-taskfeed \
    -e POSTGRES_PASSWORD=password \
    -e POSTGRES_DB=taskfeed \
    -p 5432:5432 \
    -d postgres:15

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Set up environment file
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "✅ Created .env file. Please update DATABASE_URL if needed."
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Implement the backend API (see ASSIGNMENT_README.md)"
echo "2. Run 'npm run prisma:migrate' in the backend directory"
echo "3. Run 'npm run prisma:seed' in the backend directory"
echo "4. Start the backend: 'npm run start:dev' in the backend directory"
echo "5. Start the frontend: 'npm run dev' in the frontend directory"
echo ""
echo "Database is running at: postgresql://postgres:password@localhost:5432/taskfeed"
echo "Backend will run at: http://localhost:3000"
echo "Frontend will run at: http://localhost:5173"
