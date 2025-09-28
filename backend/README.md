# Backend Assignment

This is your backend assignment workspace. You need to implement a complete NestJS API that serves the task feed.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp env.example .env
   # Edit .env with your database credentials
   ```

3. **Set up database:**
   ```bash
   # Start PostgreSQL (using Docker)
   docker run --name postgres-taskfeed -e POSTGRES_PASSWORD=password -e POSTGRES_DB=taskfeed -p 5432:5432 -d postgres:15
   
   # Run migrations
   npm run prisma:migrate
   
   # Seed the database
   npm run prisma:seed
   ```

4. **Start development server:**
   ```bash
   npm run start:dev
   ```

## What You Need to Implement

- Complete Prisma schema in `prisma/schema.prisma`
- Database seeding script in `prisma/seed.ts`
- NestJS application structure in `src/`
- Feed API endpoint at `/api/feed`

See the main `ASSIGNMENT_README.md` for detailed requirements.

## Testing

Once implemented, test your API:

```bash
# Test the feed endpoint
curl "http://localhost:3000/api/feed?limit=5"

# Start the frontend to see the full application
cd ../frontend && npm run dev
```