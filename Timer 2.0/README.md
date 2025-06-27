# Timer 2.0

A modern time tracking application built with React, Node.js, and PostgreSQL. Timer 2.0 includes user authentication, database storage, and all the features from the original Timer 1.0.

## Features

- ⏱️ **Real-time Timer**: Precise time tracking with millisecond accuracy
- 👤 **User Authentication**: Secure login and registration system
- 💾 **Database Storage**: PostgreSQL database for persistent data storage
- 📊 **Time Entries**: View, manage, and delete your time entries
- 🎨 **Modern UI**: Clean, responsive design with Google Fonts
- 🔒 **JWT Authentication**: Secure token-based authentication
- 📱 **Responsive Design**: Works on desktop and mobile devices

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

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Time Entries

- `GET /api/time-entries` - Get all time entries for authenticated user
- `POST /api/time-entries` - Create a new time entry
- `PUT /api/time-entries/:id` - Update a time entry
- `DELETE /api/time-entries/:id` - Delete a time entry
- `GET /api/time-entries/projects/list` - Get unique projects for user
- `GET /api/time-entries/stats/summary` - Get time entry statistics

## Project Structure

```
timer2/
├── server/                 # Backend server
│   ├── config.js          # Database and server configuration
│   ├── index.js           # Main server file
│   ├── db/                # Database connection and queries
│   │   ├── dbconn.js      # Database connection
│   │   ├── userQueries.js # User database operations
│   │   └── timeEntryQueries.js # Time entry database operations
│   ├── middleware/        # Express middleware
│   │   └── auth.js        # JWT authentication middleware
│   ├── routes/            # API routes
│   │   ├── authRouter.js  # Authentication routes
│   │   └── timeEntryRouter.js # Time entry routes
│   └── scripts/           # Database scripts
│       ├── setup-db.sql   # Database schema
│       ├── initDb.js      # Database initialization
│       └── seedDb.js      # Database seeding
├── src/                   # React frontend
│   ├── components/        # React components
│   │   ├── auth/          # Authentication components
│   │   │   ├── Login.js   # Login form
│   │   │   ├── Register.js # Registration form
│   │   │   └── Auth.css   # Authentication styles
│   │   └── timer/         # Timer components
│   │       ├── Timer.js   # Main timer component
│   │       ├── TimerDisplay.js # Timer display
│   │       ├── TimerControls.js # Timer controls
│   │       ├── TimeEntries.js # Time entries list
│   │       ├── Header.js  # Application header
│   │       └── Timer.css  # Timer styles
│   ├── contexts/          # React contexts
│   │   └── AuthContext.js # Authentication context
│   ├── App.js             # Main App component
│   ├── App.css            # App styles
│   └── index.js           # React entry point
├── package.json           # Frontend dependencies
└── README.md             # This file
```

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions, please open an issue on the repository.
