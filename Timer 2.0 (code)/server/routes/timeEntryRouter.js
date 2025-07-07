const express = require('express');
const router = express.Router();
const timeEntryQueries = require('../db/timeEntryQueries');
const auth = require('../middleware/auth');

// Get all time entries for the authenticated user
router.get('/', auth, async (req, res) => {
    try {
        const filters = {};
        
        // Add date range filter if provided
        if (req.query.startDate && req.query.endDate) {
            filters.startDate = new Date(req.query.startDate);
            filters.endDate = new Date(req.query.endDate);
        }
        
        // Add project filter if provided
        if (req.query.projects) {
            filters.projects = req.query.projects.split(',');
        }
        
        const timeEntries = await timeEntryQueries.getTimeEntriesByUserId(req.user.id, filters);
        res.json(timeEntries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get time entry by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const timeEntry = await timeEntryQueries.getTimeEntryById(req.params.id, req.user.id);
        if (!timeEntry) {
            return res.status(404).json({ error: 'Time entry not found' });
        }
        res.json(timeEntry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new time entry
router.post('/', auth, async (req, res) => {
    try {
        const { project, description, duration, startTime, endTime } = req.body;
        
        if (!project || !duration || !startTime || !endTime) {
            return res.status(400).json({ error: 'Project, duration, start time, and end time are required' });
        }
        
        const timeEntry = await timeEntryQueries.createTimeEntry(
            project,
            description || '',
            duration,
            new Date(startTime),
            new Date(endTime),
            req.user.id
        );
        
        res.status(201).json(timeEntry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a time entry
router.put('/:id', auth, async (req, res) => {
    try {
        const updates = {};
        if (req.body.project) updates.project = req.body.project;
        if (req.body.description !== undefined) updates.description = req.body.description;
        if (req.body.duration) updates.duration = req.body.duration;
        if (req.body.startTime) updates.startTime = new Date(req.body.startTime);
        if (req.body.endTime) updates.endTime = new Date(req.body.endTime);
        
        const timeEntry = await timeEntryQueries.updateTimeEntry(req.params.id, updates, req.user.id);
        if (!timeEntry) {
            return res.status(404).json({ error: 'Time entry not found' });
        }
        res.json(timeEntry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a time entry
router.delete('/:id', auth, async (req, res) => {
    try {
        const timeEntry = await timeEntryQueries.deleteTimeEntry(req.params.id, req.user.id);
        if (!timeEntry) {
            return res.status(404).json({ error: 'Time entry not found' });
        }
        res.json({ message: 'Time entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get projects for the authenticated user
router.get('/projects/list', auth, async (req, res) => {
    try {
        const projects = await timeEntryQueries.getProjectsByUserId(req.user.id);
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get statistics for the authenticated user
router.get('/stats/summary', auth, async (req, res) => {
    try {
        const filters = {};
        
        // Add date range filter if provided
        if (req.query.startDate && req.query.endDate) {
            filters.startDate = new Date(req.query.startDate);
            filters.endDate = new Date(req.query.endDate);
        }
        
        // Add project filter if provided
        if (req.query.projects) {
            filters.projects = req.query.projects.split(',');
        }
        
        const stats = await timeEntryQueries.getTimeEntriesStats(req.user.id, filters);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 