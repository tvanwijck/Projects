const blogQueries = require('../../server/db/blogQueries');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    console.log('Blogs API called with method:', req.method);

    try {
        switch (req.method) {
            case 'GET':
                console.log('Fetching all blogs...');
                const blogs = await blogQueries.getAllBlogs();
                console.log('Blogs fetched successfully:', blogs.length);
                res.status(200).json(blogs);
                break;
            
            case 'POST':
                const { title, content, author = 'Admin' } = req.body;
                if (!title || !content) {
                    return res.status(400).json({ error: 'Title and content are required' });
                }
                const newBlog = await blogQueries.createBlog(title, content, author);
                res.status(201).json(newBlog);
                break;
            
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error in blogs API:', error);
        res.status(500).json({ 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}; 