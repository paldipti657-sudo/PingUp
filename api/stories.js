import express from 'express';

const router = express.Router();

// Create a new story
router.post('/create', async (req, res) => {
    try {
        const { content, media_type, background_color } = req.body;
        
        // Create mock story response
        const newStory = {
            _id: Date.now().toString(),
            content: content || '',
            media_url: req.file ? `/uploads/${req.file.filename}` : '',
            media_type: media_type || 'text',
            background_color: background_color || '#ffffff',
            createdAt: new Date().toISOString(),
            user: {
                profile_picture: '/sample_profile.jpg',
                name: 'User'
            }
        };
        
        res.status(201).json(newStory);
    } catch (error) {
        console.error('Error creating story:', error);
        res.status(500).json({ error: 'Failed to create story', message: error.message });
    }
});

// Get all stories
router.get('/', async (req, res) => {
    try {
        // Return empty array or mock stories
        res.json({ stories: [] });
    } catch (error) {
        console.error('Error fetching stories:', error);
        res.status(500).json({ error: 'Failed to fetch stories' });
    }
});

// Get story by ID
router.get('/:storyId', async (req, res) => {
    try {
        const { storyId } = req.params;
        res.json({ story: null, message: 'Story not found' });
    } catch (error) {
        console.error('Error fetching story:', error);
        res.status(500).json({ error: 'Failed to fetch story' });
    }
});

export default router;
