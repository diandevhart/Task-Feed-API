# Backend Development Assignment: Task Feed API

## Overview

You are tasked with building a **NestJS backend API** that serves a task feed with pagination. The frontend application is already provided and expects a specific API structure. Your goal is to implement the backend that will make the frontend work correctly.

**Estimated Time:** 10 hours  
**Difficulty:** Intermediate to Advanced  
**Technologies:** NestJS, Prisma, PostgreSQL, TypeScript

## What You'll Build

A REST API that provides a paginated feed of tasks with the following features:
- **Cursor-based pagination** for efficient data loading
- **Complex database relationships** (Users, Projects, Tasks, Comments, Tags)
- **Data aggregation** (comment counts, last comment details)
- **Input validation** and error handling
- **Database seeding** with realistic test data

## Project Structure

```
project/
├── frontend/                 # ✅ Already provided - DO NOT MODIFY
│   ├── src/
│   │   ├── App.tsx          # React frontend expecting your API
│   │   ├── types.ts         # TypeScript interfaces your API must match
│   │   └── main.tsx
│   └── package.json
├── backend/                  # 🎯 YOUR TASK - Build this from scratch
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── ...
└── ASSIGNMENT_README.md      # This file
```

## Requirements

### 1. API Endpoint
Create a **GET** endpoint at `/api/feed` that accepts:
- `limit` (optional, default: 20, max: 50) - Number of items per page
- `cursor` (optional) - Base64-encoded cursor for pagination

### 2. Response Format
Your API must return exactly this structure:

```typescript
{
  "items": [
    {
      "id": "uuid",
      "title": "Task title",
      "status": "OPEN" | "IN_PROGRESS" | "DONE",
      "project": {
        "id": "uuid",
        "name": "Project name"
      },
      "assignee": {
        "id": "uuid", 
        "name": "User name"
      },
      "tags": [
        {
          "id": "uuid",
          "name": "tag name"
        }
      ],
      "commentsCount": 5,
      "lastComment": {
        "id": "uuid",
        "createdAt": "2025-01-20T10:11:12.000Z",
        "author": {
          "id": "uuid",
          "name": "Author name"
        },
        "snippet": "First 120 characters of comment..."
      } | null,
      "createdAt": "2025-01-20T09:00:00.000Z"
    }
  ],
  "nextCursor": "base64-encoded-cursor" | null
}
```

<!-- ### 3. Database Schema
Implement this exact Prisma schema: -->

```prisma
// model User {
//   id        String    @id @default(uuid())
//   email     String    @unique
//   name      String
//   tasks     Task[]    @relation("TaskAssignee")
//   comments  Comment[]
//   createdAt DateTime  @default(now())
// }

// model Project {
//   id        String   @id @default(uuid())
//   name      String   @unique
//   tasks     Task[]
//   createdAt DateTime @default(now())
// }

// model Task {
//   id         String      @id @default(uuid())
//   title      String
//   status     TaskStatus  @default(OPEN)
//   projectId  String
//   assigneeId String
//   project    Project     @relation(fields: [projectId], references: [id])
//   assignee   User        @relation("TaskAssignee", fields: [assigneeId], references: [id])
//   comments   Comment[]
//   tags       TaskTag[]
//   createdAt  DateTime    @default(now())

//   @@index([createdAt, id])
// }

// enum TaskStatus {
//   OPEN
//   IN_PROGRESS
//   DONE
// }

// model Comment {
//   id        String   @id @default(uuid())
//   taskId    String
//   authorId  String
//   task      Task     @relation(fields: [taskId], references: [id])
//   author    User     @relation(fields: [authorId], references: [id])
//   body      String
//   createdAt DateTime @default(now())

//   @@index([taskId, createdAt])
// }

// model Tag {
//   id    String   @id @default(uuid())
//   name  String   @unique
//   tasks TaskTag[]
// }

// model TaskTag {
//   taskId String
//   tagId  String
//   task   Task @relation(fields: [taskId], references: [id])
//   tag    Tag  @relation(fields: [tagId], references: [id])

//   @@id([taskId, tagId])
// }
```

### 4. Business Logic Requirements

#### Pagination
- Use **cursor-based pagination** (not offset-based)
- Cursor should be base64-encoded JSON: `{"createdAt": "ISO-string", "id": "uuid"}`
- Sort by `createdAt DESC, id DESC` for consistent ordering
- Return `nextCursor` only if there are more items available

#### Data Aggregation
- Include `commentsCount` for each task
- Include `lastComment` with:
  - Most recent comment for the task
  - Author information
  - Snippet (first 120 characters, truncated with "…")
  - ISO timestamp string
- Return `null` for `lastComment` if no comments exist

#### Validation
- Validate `limit` parameter (1-50 range)
- Validate cursor format and content
- Return appropriate HTTP status codes and error messages

### 5. Database Seeding
Create a seed script that generates:
- 5 users with realistic names and emails
- 3 projects
- 8 different tags
- 100 tasks with random:
  - Titles (3-word combinations)
  - Statuses
  - Project assignments
  - User assignments
  - 0-3 tags per task
  - 0-10 comments per task
- Comments should have realistic timestamps (after task creation)

## Technical Requirements

### Dependencies
Your `package.json` should include:
- `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express`
- `@prisma/client`, `prisma`
- `class-validator`, `class-transformer`
- `reflect-metadata`, `rxjs`
- `dotenv`

### Project Setup
<!-- 1. Use **ES modules** (`"type": "module"` in package.json) -->
<!-- 2. Configure TypeScript with strict settings -->
<!-- 3. Set up Prisma with PostgreSQL -->
4. Enable CORS for frontend communication
5. Add global validation pipes
6. Use proper error handling

<!-- ### Code Quality
- Use TypeScript with proper typing
- Implement proper dependency injection
- Follow NestJS best practices
- Add input validation with decorators
- Handle errors gracefully
- Write clean, readable code -->

## Getting Started

<!-- ### 1. Environment Setup
```bash
# Navigate to the backend directory
cd backend

# Create .env file
cp env.example .env
# Edit .env with your database credentials:
# DATABASE_URL="postgresql://username:password@localhost:5432/taskfeed"
# PORT=3000
# CORS_ORIGIN="http://localhost:5173"
``` -->
<!-- 
### 2. Database Setup
```bash
# Start PostgreSQL (using Docker or local installation)
docker run --name postgres-taskfeed -e POSTGRES_PASSWORD=password -e POSTGRES_DB=taskfeed -p 5432:5432 -d postgres:15

# Run migrations (from backend directory)
npx prisma migrate dev --name init

# Seed the database (from backend directory)
npm run prisma:seed
``` -->

### 3. Development
```bash
# Install dependencies (from backend directory)
npm install

# Start development server (from backend directory)
npm run start:dev

# Test the API
curl "http://localhost:3000/api/feed?limit=5"
```

## Testing Your Implementation

### 1. Manual Testing
- Start your backend server (from backend directory: `npm run start:dev`)
- Open the frontend (`cd frontend && npm run dev`)
- Verify the feed loads correctly
- Test pagination by clicking "Load more"
- Test different page sizes

### 2. API Testing
Use the provided Postman collection or test with curl:

```bash
# First page
curl "http://localhost:3000/api/feed?limit=10"

# Next page (use cursor from previous response)
curl "http://localhost:3000/api/feed?limit=10&cursor=eyJjcmVhdGVkQXQiOiIyMDI1LTAxLTIwVDA5OjAwOjAwLjAwMFoiLCJpZCI6InV1aWQifQ=="

# Test validation
curl "http://localhost:3000/api/feed?limit=100"  # Should return 400
```

### 3. Expected Behavior
- ✅ Feed loads with 20 items by default
- ✅ Pagination works with cursor
- ✅ Comments count is accurate
- ✅ Last comment shows correct author and snippet
- ✅ Tags are properly associated
- ✅ Status badges display correctly
- ✅ Error handling works for invalid inputs

## Evaluation Criteria

### Core Functionality (60%)
- ✅ API endpoint responds correctly
- ✅ Response format matches specification exactly
- ✅ Pagination works with cursors
- ✅ Database relationships are correct
- ✅ Data aggregation (comments, tags) works

### Code Quality (25%)
- ✅ Clean, readable TypeScript code
- ✅ Proper NestJS architecture
- ✅ Input validation and error handling
- ✅ Database schema and migrations
- ✅ Seed script generates realistic data

### Technical Implementation (15%)
- ✅ Proper dependency injection
- ✅ Efficient database queries
- ✅ CORS configuration
- ✅ Environment configuration
- ✅ Build and deployment setup

## Common Pitfalls to Avoid

1. **Response Format**: Ensure your API response matches the TypeScript interfaces exactly
2. **Pagination**: Use cursor-based pagination, not offset-based
3. **Database Indexes**: Add the required indexes for performance
4. **Comment Snippets**: Truncate to 120 characters with "…" if longer
5. **Timestamps**: Use ISO string format for all dates
6. **Error Handling**: Return proper HTTP status codes and error messages
7. **CORS**: Configure CORS to allow frontend communication

## Time Breakdown (Suggested)

- **Setup & Configuration** (1 hour): Project setup, dependencies, TypeScript config (all from `backend/` directory)
- **Database Schema** (1.5 hours): Prisma schema, migrations, indexes (from `backend/` directory)
- **Basic API Structure** (1 hour): NestJS modules, controllers, services (from `backend/` directory)
- **Core Feed Logic** (3 hours): Main feed service, pagination, data aggregation (from `backend/` directory)
- **Validation & Error Handling** (1 hour): Input validation, error responses (from `backend/` directory)
- **Database Seeding** (1 hour): Seed script with realistic data (from `backend/` directory)
- **Testing & Debugging** (1.5 hours): Manual testing, bug fixes, edge cases

## Submission

When complete, ensure:
1. Your backend server starts without errors
2. The frontend loads and displays the feed correctly
3. Pagination works smoothly
4. All data relationships are properly displayed
5. Your code is clean and well-structured

## Questions?

If you encounter issues or need clarification on any requirements, don't hesitate to ask. The goal is to demonstrate your ability to build a production-ready API that integrates seamlessly with the provided frontend.

Good luck! 🚀
