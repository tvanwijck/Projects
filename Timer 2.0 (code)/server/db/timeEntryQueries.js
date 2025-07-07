const db = require('./dbconn');

const timeEntryQueries = {
    // Create a new time entry
    async createTimeEntry(project, description, duration, startTime, endTime, userId) {
        const result = await db.query(
            'INSERT INTO time_entries (project, description, duration, start_time, end_time, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [project, description, duration, startTime, endTime, userId]
        );
        return result.rows[0];
    },

    // Get all time entries for a user
    async getTimeEntriesByUserId(userId, filters = {}) {
        let query = 'SELECT * FROM time_entries WHERE user_id = $1';
        const values = [userId];
        let paramCount = 2;

        // Add date range filter
        if (filters.startDate && filters.endDate) {
            query += ` AND start_time >= $${paramCount} AND start_time <= $${paramCount + 1}`;
            values.push(filters.startDate, filters.endDate);
            paramCount += 2;
        }

        // Add project filter
        if (filters.projects && filters.projects.length > 0) {
            const placeholders = filters.projects.map((_, index) => `$${paramCount + index}`).join(',');
            query += ` AND project IN (${placeholders})`;
            values.push(...filters.projects);
            paramCount += filters.projects.length;
        }

        query += ' ORDER BY start_time DESC';
        
        const result = await db.query(query, values);
        return result.rows;
    },

    // Get time entry by ID
    async getTimeEntryById(id, userId) {
        const result = await db.query(
            'SELECT * FROM time_entries WHERE id = $1 AND user_id = $2',
            [id, userId]
        );
        return result.rows[0];
    },

    // Update time entry
    async updateTimeEntry(id, updates, userId) {
        const fields = [];
        const values = [];
        let paramCount = 1;

        if (updates.project) {
            fields.push(`project = $${paramCount}`);
            values.push(updates.project);
            paramCount++;
        }
        if (updates.description !== undefined) {
            fields.push(`description = $${paramCount}`);
            values.push(updates.description);
            paramCount++;
        }
        if (updates.duration) {
            fields.push(`duration = $${paramCount}`);
            values.push(updates.duration);
            paramCount++;
        }
        if (updates.startTime) {
            fields.push(`start_time = $${paramCount}`);
            values.push(updates.startTime);
            paramCount++;
        }
        if (updates.endTime) {
            fields.push(`end_time = $${paramCount}`);
            values.push(updates.endTime);
            paramCount++;
        }

        if (fields.length === 0) {
            throw new Error('No valid updates provided');
        }

        values.push(id, userId);
        const result = await db.query(
            `UPDATE time_entries SET ${fields.join(', ')} WHERE id = $${paramCount} AND user_id = $${paramCount + 1} RETURNING *`,
            values
        );
        return result.rows[0];
    },

    // Delete time entry
    async deleteTimeEntry(id, userId) {
        const result = await db.query(
            'DELETE FROM time_entries WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, userId]
        );
        return result.rows[0];
    },

    // Get unique projects for a user
    async getProjectsByUserId(userId) {
        const result = await db.query(
            'SELECT DISTINCT project FROM time_entries WHERE user_id = $1 ORDER BY project',
            [userId]
        );
        return result.rows.map(row => row.project);
    },

    // Get time entries statistics for a user
    async getTimeEntriesStats(userId, filters = {}) {
        let query = `
            SELECT 
                COUNT(*) as total_entries,
                SUM(duration) as total_duration,
                AVG(duration) as avg_duration,
                MIN(start_time) as earliest_entry,
                MAX(start_time) as latest_entry
            FROM time_entries 
            WHERE user_id = $1
        `;
        const values = [userId];
        let paramCount = 2;

        // Add date range filter
        if (filters.startDate && filters.endDate) {
            query += ` AND start_time >= $${paramCount} AND start_time <= $${paramCount + 1}`;
            values.push(filters.startDate, filters.endDate);
            paramCount += 2;
        }

        // Add project filter
        if (filters.projects && filters.projects.length > 0) {
            const placeholders = filters.projects.map((_, index) => `$${paramCount + index}`).join(',');
            query += ` AND project IN (${placeholders})`;
            values.push(...filters.projects);
        }

        const result = await db.query(query, values);
        return result.rows[0];
    }
};

module.exports = timeEntryQueries; 