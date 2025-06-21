# Module 6 - Backend API Development with PostgreSQL

## Project Overview

This project is part of the Full Stack Development bootcamp, and in this module we are focusing on backend development, REST APIs, and relational databases. The application demonstrates the implementation of modern backend technologies and best practices with PostgreSQL.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (Relational Database)
- **API**: RESTful architecture
- **Environment Variables**: dotenv for secure configuration
- **Middleware**:
  - Morgan for logging
  - CORS for cross-origin resource sharing
  - Express.json for parsing JSON bodies

## Key Learning Objectives

This module focuses on several crucial backend development concepts:

1. **REST API Development**

   - Implementation of RESTful endpoints
   - Proper HTTP methods (GET, POST, PUT, DELETE)
   - Status code management
   - Request/Response handling

2. **Relational Database Integration**

   - PostgreSQL database setup
   - SQL query implementation
   - Table relationships and foreign keys
   - CRUD operations with SQL

3. **Security Best Practices**

   - Environment variable management
   - Secure credential handling
   - API endpoint protection
   - Data validation

4. **Middleware Implementation**
   - Request logging with Morgan
   - CORS configuration
   - Body parsing
   - Error handling

## Project Structure

```
module-6/
├── db/              # Database connection and queries
│   ├── dbconn.js    # PostgreSQL connection
│   ├── userQueries.js
│   └── blogQueries.js
├── routes/          # API routes
│   ├── userRouter.js
│   └── blogsRouter.js
├── scripts/         # Database setup scripts
│   ├── initDb.js
│   ├── seedDb.js
│   └── setup-db.sql
├── index.js         # Main application file
└── .env            # Environment variables (not tracked in git)
```

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with required environment variables:
   ```
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=blog_db
   PORT=3000
   ```
4. Initialize the database: `npm run db:init`
5. Start the server: `npm start`

## API Endpoints

### Users

- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Blogs

- `POST /api/blogs` - Create a new blog
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get blog by ID
- `GET /api/blogs/user/:userId` - Get blogs by user
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

## Database Schema

### Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Blogs Table

```sql
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Security Considerations

- Sensitive data is stored in environment variables
- `.env` file is included in `.gitignore`
- API endpoints are protected with proper validation
- Input validation is implemented
- SQL injection prevention using parameterized queries

## Learning Outcomes

This project demonstrates practical implementation of:

- RESTful API design principles
- Relational database operations with PostgreSQL
- SQL query optimization
- Table relationships and foreign keys
- Backend security practices
- Environment configuration
- Middleware usage
- Error handling

## Future Improvements

- Add more comprehensive error handling
- Implement rate limiting
- Add API documentation with Swagger
- Enhance security measures
- Add unit and integration tests
- Implement database migrations
- Add connection pooling optimization

## Next Modules

- In the next modules we will implement and connect the frontend to this back-end app, using React.
