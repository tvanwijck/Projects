const db = require('./dbconn');

const blogQueries = {
    // Create a new blog
    async createBlog(title, content, author = 'Admin') {
        try {
            const query = `
                INSERT INTO blogs (title, content, author)
                VALUES ($1, $2, $3)
                RETURNING id, title, content, author, created_at
            `;
            const values = [title, content, author];
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error in createBlog:', error);
            throw error;
        }
    },

    // Get blog by ID
    async getBlogById(id) {
        try {
            const query = `
                SELECT id, title, content, author, created_at, updated_at
                FROM blogs
                WHERE id = $1
            `;
            const result = await db.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error in getBlogById:', error);
            throw error;
        }
    },

    // Get all blogs
    async getAllBlogs() {
        try {
            const query = `
                SELECT id, title, content, author, created_at, updated_at
                FROM blogs
                ORDER BY created_at DESC
            `;
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error in getAllBlogs:', error);
            throw error;
        }
    },

    // Get blogs by user ID
    async getBlogsByUserId(userId) {
        const query = `
            SELECT b.*, u.username, u.email
            FROM blogs b
            JOIN users u ON b.user_id = u.id
            WHERE b.user_id = $1
            ORDER BY b.created_at DESC
        `;
        const result = await db.query(query, [userId]);
        return result.rows;
    },

    // Update blog
    async updateBlog(id, updates) {
        try {
            const allowedUpdates = ['title', 'content', 'author'];
            const setClause = Object.keys(updates)
                .filter(key => allowedUpdates.includes(key))
                .map((key, index) => `${key} = $${index + 2}`)
                .join(', ');

            if (!setClause) {
                throw new Error('No valid updates provided');
            }

            const query = `
                UPDATE blogs
                SET ${setClause}
                WHERE id = $1
                RETURNING id, title, content, author, created_at, updated_at
            `;
            const values = [id, ...Object.values(updates)];
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error in updateBlog:', error);
            throw error;
        }
    },

    // Delete blog
    async deleteBlog(id) {
        try {
            const query = `
                DELETE FROM blogs
                WHERE id = $1
                RETURNING id, title, author
            `;
            const result = await db.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error in deleteBlog:', error);
            throw error;
        }
    }
};

module.exports = blogQueries;
