const blogQueries = require('../../server/db/blogQueries');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { id } = req.query;

    try {
        switch (req.method) {
            case 'GET':
                const blog = await blogQueries.getBlogById(id);
                if (!blog) {
                    return res.status(404).json({ error: 'Blog not found' });
                }
                res.status(200).json(blog);
                break;
            
            case 'PUT':
                const updates = {};
                if (req.body.title) updates.title = req.body.title;
                if (req.body.content) updates.content = req.body.content;
                if (req.body.author) updates.author = req.body.author;

                if (Object.keys(updates).length === 0) {
                    return res.status(400).json({ error: 'No valid updates provided' });
                }

                const updatedBlog = await blogQueries.updateBlog(id, updates);
                if (!updatedBlog) {
                    return res.status(404).json({ error: 'Blog not found' });
                }
                res.status(200).json(updatedBlog);
                break;
            
            case 'DELETE':
                const deletedBlog = await blogQueries.deleteBlog(id);
                if (!deletedBlog) {
                    return res.status(404).json({ error: 'Blog not found' });
                }
                res.status(200).json(deletedBlog);
                break;
            
            default:
                res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error in blog API:', error);
        res.status(500).json({ error: error.message });
    }
}; 