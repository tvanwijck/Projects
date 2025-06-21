const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool(config.postgres);

// Handle pool errors
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};
