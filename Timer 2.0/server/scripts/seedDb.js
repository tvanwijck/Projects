const bcrypt = require('bcryptjs');
const db = require('../db/dbconn');

async function seedDatabase() {
    try {
        console.log('Seeding database...');
        
        // Create a sample user
        const hashedPassword = await bcrypt.hash('password123', 10);
        const userResult = await db.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
            ['demo_user', 'demo@example.com', hashedPassword]
        );
        
        const userId = userResult.rows[0].id;
        
        // Create sample time entries
        const sampleEntries = [
            {
                project: 'Sample Project 1',
                description: 'Working on initial setup and configuration',
                duration: 3600, // 1 hour
                start_time: new Date(Date.now() - 86400000), // 1 day ago
                end_time: new Date(Date.now() - 86400000 + 3600000),
                user_id: userId
            },
            {
                project: 'Sample Project 2',
                description: 'Code review and bug fixes',
                duration: 1800, // 30 minutes
                start_time: new Date(Date.now() - 43200000), // 12 hours ago
                end_time: new Date(Date.now() - 43200000 + 1800000),
                user_id: userId
            }
        ];
        
        for (const entry of sampleEntries) {
            await db.query(
                'INSERT INTO time_entries (project, description, duration, start_time, end_time, user_id) VALUES ($1, $2, $3, $4, $5, $6)',
                [entry.project, entry.description, entry.duration, entry.start_time, entry.end_time, entry.user_id]
            );
        }
        
        console.log('Database seeded successfully!');
        console.log('Sample user created:');
        console.log('Username: demo_user');
        console.log('Email: demo@example.com');
        console.log('Password: password123');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase(); 