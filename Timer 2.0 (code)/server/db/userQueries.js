const db = require('./dbconn');
const bcrypt = require('bcryptjs');

const userQueries = {
    // Create a new user
    async createUser(username, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
            [username, email, hashedPassword]
        );
        return result.rows[0];
    },

    // Get user by ID
    async getUserById(id) {
        const result = await db.query(
            'SELECT id, username, email, created_at FROM users WHERE id = $1',
            [id]
        );
        return result.rows[0];
    },

    // Get user by username
    async getUserByUsername(username) {
        const result = await db.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );
        return result.rows[0];
    },

    // Get user by email
    async getUserByEmail(email) {
        const result = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return result.rows[0];
    },

    // Update user
    async updateUser(id, updates) {
        const fields = [];
        const values = [];
        let paramCount = 1;

        if (updates.username) {
            fields.push(`username = $${paramCount}`);
            values.push(updates.username);
            paramCount++;
        }
        if (updates.email) {
            fields.push(`email = $${paramCount}`);
            values.push(updates.email);
            paramCount++;
        }
        if (updates.password) {
            const hashedPassword = await bcrypt.hash(updates.password, 10);
            fields.push(`password = $${paramCount}`);
            values.push(hashedPassword);
            paramCount++;
        }

        if (fields.length === 0) {
            throw new Error('No valid updates provided');
        }

        values.push(id);
        const result = await db.query(
            `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING id, username, email, created_at`,
            values
        );
        return result.rows[0];
    },

    // Delete user
    async deleteUser(id) {
        const result = await db.query(
            'DELETE FROM users WHERE id = $1 RETURNING id, username, email',
            [id]
        );
        return result.rows[0];
    },

    // Get all users (for admin purposes)
    async getAllUsers() {
        const result = await db.query(
            'SELECT id, username, email, created_at FROM users ORDER BY created_at DESC'
        );
        return result.rows;
    }
};

module.exports = userQueries; 