# Task Feed Assignment

A full-stack application assignment where you'll build a NestJS backend API to serve a task feed with pagination.

## 🎯 Assignment Overview

**Duration:** 10 hours  
**Difficulty:** Intermediate to Advanced  
**Goal:** Build a complete backend API that integrates with the provided React frontend

## 📁 Project Structure

```
├── frontend/                 # ✅ React frontend (provided)
│   ├── src/
│   │   ├── App.tsx          # Main application expecting your API
│   │   ├── types.ts         # TypeScript interfaces your API must match
│   │   └── main.tsx
│   └── package.json
├── backend/                  # 🎯 YOUR TASK - Build this from scratch
│   ├── src/                 # NestJS application (starter files provided)
│   ├── prisma/              # Database schema and seeding
│   ├── package.json         # Dependencies (configured)
│   └── README.md            # Backend-specific instructions
├── postman/                 # API testing collection
├── ASSIGNMENT_README.md     # 📖 Detailed assignment requirements
├── setup.sh                 # 🚀 Quick setup script
└── README.md                # This file
```

## 🚀 Quick Start

### Option 1: Automated Setup
```bash
./setup.sh
```

### Option 2: Manual Setup
```bash
# 1. Start PostgreSQL
docker run --name postgres-taskfeed \
    -e POSTGRES_PASSWORD=password \
    -e POSTGRES_DB=taskfeed \
    -p 5432:5432 \
    -d postgres:15

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Set up environment
cd ../backend
cp env.example .env
# Edit .env with your database URL if needed
```

## 📋 What You Need to Build

### Backend API Requirements
- **GET /api/feed** endpoint with cursor-based pagination
- Complex database relationships (Users, Projects, Tasks, Comments, Tags)
- Data aggregation (comment counts, last comment details)
- Input validation and error handling
- Database seeding with realistic test data

### Key Features
- ✅ Cursor-based pagination (not offset-based)
- ✅ Complex data relationships and aggregation
- ✅ Input validation with proper error responses
- ✅ Efficient database queries with proper indexing
- ✅ CORS configuration for frontend integration

## 🧪 Testing Your Implementation

1. **Start your backend:**
   ```bash
   cd backend
   npm run prisma:migrate  # After implementing schema
   npm run prisma:seed     # After implementing seed script
   npm run start:dev
   ```

2. **Start the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Verify integration:**
   - Frontend should load and display the task feed
   - Pagination should work smoothly
   - All data relationships should display correctly

## 📚 Documentation

- **[ASSIGNMENT_README.md](./ASSIGNMENT_README.md)** - Complete assignment requirements and specifications
- **[backend/README.md](./backend/README.md)** - Backend-specific setup and instructions
- **[postman/Feed API.postman_collection.json](./postman/Feed%20API.postman_collection.json)** - API testing collection

## 🎯 Success Criteria

Your implementation is successful when:
- ✅ The frontend loads and displays the task feed correctly
- ✅ Pagination works with cursor-based navigation
- ✅ All data relationships (projects, assignees, tags, comments) display properly
- ✅ The API handles validation errors gracefully
- ✅ Your code follows NestJS best practices
- ✅ Database queries are efficient and properly indexed

## 🆘 Getting Help

If you encounter issues:
1. Check the detailed requirements in `ASSIGNMENT_README.md`
2. Verify your API response format matches the TypeScript interfaces in `frontend/src/types.ts`
3. Test your API endpoints using the provided Postman collection
4. Ensure your database schema and seeding script are working correctly

## 🏆 Evaluation

The assignment will be evaluated on:
- **Core Functionality (60%)** - API correctness and data accuracy
- **Code Quality (25%)** - Clean, maintainable TypeScript code
- **Technical Implementation (15%)** - Proper architecture and best practices

Good luck! 🚀