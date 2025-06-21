const express = require('express');
const router = express.Router();
const blogQueries = require('../db/blogQueries');

// Create a new blog
router.post('/', async (req, res) => {
    try {
        const { title, content, author = 'Admin' } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }
        const blog = await blogQueries.createBlog(title, content, author);
        res.status(201).json(blog);
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(400).json({ error: error.message });
    }
});

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await blogQueries.getAllBlogs();
        res.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get blog by ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await blogQueries.getBlogById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get blogs by user ID
router.get('/user/:userId', async (req, res) => {
    try {
        const blogs = await blogQueries.getBlogsByUserId(req.params.userId);
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update blog
router.put('/:id', async (req, res) => {
    try {
        const updates = {};
        if (req.body.title) updates.title = req.body.title;
        if (req.body.content) updates.content = req.body.content;
        if (req.body.author) updates.author = req.body.author;

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'No valid updates provided' });
        }

        const blog = await blogQueries.updateBlog(req.params.id, updates);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(400).json({ error: error.message });
    }
});

// Delete blog
router.delete('/:id', async (req, res) => {
    try {
        const blog = await blogQueries.deleteBlog(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
