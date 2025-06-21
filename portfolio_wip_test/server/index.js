const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
// const { pool } = require('./db/dbconn');

const userRouter = require('./routes/userRouter');
const blogsRouter = require('./routes/blogsRouter');

const app = express();

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://portfoliowiptest.vercel.app'
    ],
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

// API Routes
app.use('/api/users', userRouter);
app.use('/api/blogs', blogsRouter);

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('API endpoints available at:');
    console.log('  GET  /api/blogs');
    console.log('  POST /api/blogs');
    console.log('  GET  /api/blogs/:id');
    console.log('  PUT  /api/blogs/:id');
    console.log('  DELETE /api/blogs/:id');
});

// Handle application shutdown
process.on('SIGINT', async () => {
    try {
        // await pool.end();
        console.log('PostgreSQL connection closed through app termination');
        process.exit(0);
    } catch (err) {
        console.error('Error during app termination:', err);
        process.exit(1);
    }
});
