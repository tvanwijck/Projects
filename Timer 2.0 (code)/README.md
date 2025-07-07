# Timer 2.0

A modern, secure time tracking application built with React, Node.js, and PostgreSQL. Timer 2.0 includes comprehensive user authentication, database storage, and enterprise-grade security measures.

You can give your tracked time a description (with styling functions), save it, and copy it into Sheets/Excel, Slides/Powerpoint, Docs/Word, or wherever you want it. You can copy as text with all the styling copied, or copy it as spreadsheet data which pastes as value.

And... You can initialize Monkey Time! 🐒🎉🥳🍌

## Features

- ⏱️ **Real-time Timer**: Precise time tracking with millisecond accuracy
- 👤 **User Authentication**: Secure login and registration system with JWT tokens
- 💾 **Database Storage**: PostgreSQL database with parameterized queries
- 📊 **Time Entries**: View, manage, and delete your time entries
- 🎨 **Modern UI**: Clean, responsive design with Google Fonts
- 🔒 **Enterprise Security**: JWT authentication, password hashing, rate limiting
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🛡️ **Data Protection**: User data isolation and secure API endpoints

## Tech Stack

### Frontend

- React 19
- React Router DOM
- Axios for API calls
- React Hot Toast for notifications
- CSS3 with CSS Variables

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled
- Express Rate Limiting

## Security Features

### 🔐 Authentication & Authorization

**JWT (JSON Web Tokens)**

- Secure token-based authentication
- 24-hour token expiration
- Automatic token verification on protected routes
- Stateless authentication system

**Password Security**

- bcryptjs hashing with 10 salt rounds
- Minimum 6-character password requirement
- Secure password comparison
- Passwords never stored in plain text

### 🛡️ API Security

**Rate Limiting**

- 100 requests per 15 minutes per IP address
- Prevents brute force attacks and API abuse
- Configurable limits for different endpoints

**Input Validation**

- Comprehensive input sanitization
- Required field validation
- Duplicate username/email prevention
- SQL injection prevention through parameterized queries

**CORS Configuration**

- Cross-origin request handling
- Secure API access control

### 🗄️ Database Security

**Parameterized Queries**

- All database operations use parameterized queries
- Prevents SQL injection attacks
- Secure data handling

**User Data Isolation**

- Users can only access their own time entries
- Foreign key constraints with CASCADE delete
- Proper database indexing for performance and security

**Database Schema**

```sql
-- Secure user table with proper constraints
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Hashed passwords only
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Time entries with user isolation
CREATE TABLE time_entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    -- ... other fields
);
```

### 🔧 Environment & Configuration Security

**Environment Variables**

- Sensitive data stored in `.env` files
- Database credentials and JWT secrets externalized
- `.gitignore` configured to exclude sensitive files
- Example configuration provided via `example.env`

**Configuration Management**

```javascript
// Secure configuration loading
require("dotenv").config();

module.exports = {
  postgres: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // ... other config
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "24h",
  },
};
```

### 🚀 Frontend Security

**Token Management**

- JWT tokens stored securely in localStorage
- Automatic token inclusion in API requests
- Centralized authentication state management
- Secure logout with token cleanup

**API Communication**

- Axios interceptors for automatic authentication
- Error handling for authentication failures
- Secure API endpoint communication

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Database Setup

First, create a new PostgreSQL database:

```sql
CREATE DATABASE timer2_db;
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd timer2/server
npm install
```

Create a `.env` file in the server directory:

```bash
cp example.env .env
```

Edit the `.env` file with your database credentials:

```env
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=timer2_db
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**⚠️ Security Note**: Use a strong, unique JWT secret in production. Generate one using:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Initialize the database:

```bash
npm run db:init
```

Seed the database with sample data:

```bash
npm run db:seed
```

Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

In a new terminal, navigate to the timer2 directory and install dependencies:

```bash
cd timer2
npm install
```

Start the React development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

### 4. Demo Account

After seeding the database, you can use these demo credentials:

- **Username**: demo_user
- **Password**: password123

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user (password hashed with bcrypt)
- `POST /api/auth/login` - Login user (JWT token returned)

### Time Entries (All protected with JWT authentication)

- `GET /api/time-entries` - Get all time entries for authenticated user
- `POST /api/time-entries` - Create a new time entry
- `PUT /api/time-entries/:id` - Update a time entry (user-verified)
- `DELETE /api/time-entries/:id` - Delete a time entry (user-verified)
- `GET /api/time-entries/projects/list` - Get unique projects for user
- `GET /api/time-entries/stats/summary` - Get time entry statistics

## Project Structure

```
timer2/
├── server/                 # Backend server
│   ├── config.js          # Database and server configuration
│   ├── index.js           # Main server file with rate limiting
│   ├── db/                # Database connection and queries
│   │   ├── dbconn.js      # Secure database connection
│   │   ├── userQueries.js # User database operations (password hashing)
│   │   └── timeEntryQueries.js # Time entry database operations
│   ├── middleware/        # Express middleware
│   │   └── auth.js        # JWT authentication middleware
│   ├── routes/            # API routes
│   │   ├── authRouter.js  # Authentication routes (input validation)
│   │   └── timeEntryRouter.js # Time entry routes (user isolation)
│   └── scripts/           # Database scripts
│       ├── setup-db.sql   # Secure database schema
│       ├── initDb.js      # Database initialization
│       └── seedDb.js      # Database seeding
├── src/                   # React frontend
│   ├── components/        # React components
│   │   ├── auth/          # Authentication components
│   │   │   ├── Login.js   # Login form with validation
│   │   │   ├── Register.js # Registration form with validation
│   │   │   └── Auth.css   # Authentication styles
│   │   └── timer/         # Timer components
│   │       ├── Timer.js   # Main timer component
│   │       ├── TimerDisplay.js # Timer display
│   │       ├── TimerControls.js # Timer controls
│   │       ├── TimeEntries.js # Time entries list
│   │       ├── Header.js  # Application header
│   │       └── Timer.css  # Timer styles
│   ├── contexts/          # React contexts
│   │   └── AuthContext.js # Authentication context (token management)
│   ├── App.js             # Main App component
│   ├── App.css            # App styles
│   └── index.js           # React entry point
├── package.json           # Frontend dependencies
└── README.md             # This file
```

## Security Best Practices Implemented

### ✅ Authentication

- JWT tokens with expiration
- Secure password hashing with bcrypt
- Input validation and sanitization
- User session management

### ✅ Authorization

- Route protection with middleware
- User data isolation
- Role-based access control (user-specific data)

### ✅ Data Protection

- Parameterized queries prevent SQL injection
- Environment variables for sensitive data
- Secure database connections
- Input validation and sanitization

### ✅ API Security

- Rate limiting to prevent abuse
- CORS configuration
- Error handling without information leakage
- Secure HTTP headers

### ✅ Frontend Security

- Secure token storage
- Automatic authentication headers
- Input validation
- Secure logout procedures

## Usage

1. **Register/Login**: Create an account or use the demo credentials
2. **Start Timer**: Enter a project name and description, then click Start
3. **Track Time**: The timer will run in real-time with millisecond precision
4. **Pause/Continue**: Pause the timer and continue later
5. **Stop & Save**: Stop the timer and save your time entry
6. **View Entries**: See all your time entries with project details
7. **Delete Entries**: Remove unwanted time entries

## Development

### Running in Development Mode

1. Start the backend server:

   ```bash
   cd timer2/server
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd timer2
   npm start
   ```

### Building for Production

1. Build the React app:

   ```bash
   cd timer2
   npm run build
   ```

2. The built files will be in the `build` directory

### Security Considerations for Production

1. **Environment Variables**: Ensure all sensitive data is in environment variables
2. **HTTPS**: Use SSL certificates for production deployment
3. **JWT Secret**: Use a strong, unique JWT secret
4. **Database**: Use a production-grade PostgreSQL setup
5. **Rate Limiting**: Adjust rate limits based on your application needs
6. **Logging**: Implement proper logging for security events
7. **Monitoring**: Set up monitoring for suspicious activities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly, especially security features
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions, please open an issue on the repository.
