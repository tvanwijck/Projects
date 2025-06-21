require('dotenv').config();

module.exports = {
    postgres: {
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'blog_db'
    },
    server: {
        port: process.env.PORT || 3001
    }
};
