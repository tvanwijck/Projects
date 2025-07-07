const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool(config.postgres);

// Test the connection
pool.connect((err, _, release) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Successfully connected to PostgreSQL database');
    release();
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
}; 