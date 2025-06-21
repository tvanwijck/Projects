const db = require('./dbconn');

const userQueries = {
    // Create a new user
    async createUser(username, email, password) {
        const query = `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, username, email, created_at
        `;
        const values = [username, email, password];
        const result = await db.query(query, values);
        return result.rows[0];
    },

    // Get user by ID
    async getUserById(id) {
        const query = `
            SELECT id, username, email, created_at
            FROM users
            WHERE id = $1
        `;
        const result = await db.query(query, [id]);
        return result.rows[0];
    },

    // Get user by email
    async getUserByEmail(email) {
        const query = `
            SELECT id, username, email, password, created_at
            FROM users
            WHERE email = $1
        `;
        const result = await db.query(query, [email]);
        return result.rows[0];
    },

    // Get all users
    async getAllUsers() {
        const query = `
            SELECT id, username, email, created_at
            FROM users
            ORDER BY created_at DESC
        `;
        const result = await db.query(query);
        return result.rows;
    },

    // Update user
    async updateUser(id, updates) {
        const allowedUpdates = ['username', 'email', 'password'];
        const setClause = Object.keys(updates)
            .filter(key => allowedUpdates.includes(key))
            .map((key, index) => `${key} = $${index + 2}`)
            .join(', ');

        if (!setClause) {
            throw new Error('No valid updates provided');
        }

        const query = `
            UPDATE users
            SET ${setClause}
            WHERE id = $1
            RETURNING id, username, email, created_at
        `;
        const values = [id, ...Object.values(updates)];
        const result = await db.query(query, values);
        return result.rows[0];
    },

    // Delete user
    async deleteUser(id) {
        const query = `
            DELETE FROM users
            WHERE id = $1
            RETURNING id, username, email
        `;
        const result = await db.query(query, [id]);
        return result.rows[0];
    }
};

module.exports = userQueries;
