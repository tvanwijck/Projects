const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

const blogs = [
    {
        title: 'Welcome to My Portfolio',
        content: 'This is my first blog post. Welcome to my portfolio website where I showcase my projects and share my thoughts on technology.',
        author: 'Admin'
    },
    {
        title: 'Building a Full-Stack Portfolio',
        content: 'Learn about the technologies and techniques I used to build this portfolio website, including React, Node.js, and PostgreSQL.',
        author: 'Admin'
    },
    {
        title: 'The Future of Web Development',
        content: 'Exploring the latest trends in web development and what the future holds for developers.',
        author: 'Admin'
    }
];

async function seedDatabase() {
    try {
        console.log('Starting database seeding...');

        // Clear existing data
        await pool.query('DELETE FROM blogs');
        console.log('Cleared existing blogs');

        // Create blogs
        for (const blog of blogs) {
            const result = await pool.query(
                'INSERT INTO blogs (title, content, author) VALUES ($1, $2, $3) RETURNING id',
                [blog.title, blog.content, blog.author]
            );
            console.log(`Created blog: ${blog.title} with ID: ${result.rows[0].id}`);
        }

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await pool.end();
        console.log('Database connection closed');
    }
}

seedDatabase();
