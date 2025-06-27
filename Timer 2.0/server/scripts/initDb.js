const fs = require('fs');
const path = require('path');
const db = require('../db/dbconn');

async function initDatabase() {
    try {
        console.log('Initializing database...');
        
        // Read the SQL setup file
        const setupSQL = fs.readFileSync(
            path.join(__dirname, 'setup-db.sql'),
            'utf8'
        );
        
        // Execute the SQL commands
        await db.query(setupSQL);
        
        console.log('Database initialized successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
}

initDatabase(); 