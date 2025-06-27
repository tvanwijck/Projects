require('dotenv').config();

module.exports = {
    postgres: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        ssl: {
            rejectUnauthorized: false
        }
    },
    server: {
        port: process.env.PORT || 5000
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
        expiresIn: '24h'
    }
}; 