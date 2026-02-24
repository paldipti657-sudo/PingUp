import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (req, res) => {
  try {
    res.status(200).send('Server is running 🚀');
  } catch (error) {
    console.error('Root error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  try {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoints
app.get('/api/posts', (req, res) => {
  try {
    res.json({ posts: [] });
  } catch (error) {
    console.error('Posts error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.get('/api/stories', (req, res) => {
  try {
    res.json({ stories: [] });
  } catch (error) {
    console.error('Stories error:', error);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

app.get('/api/messages', (req, res) => {
  try {
    res.json({ messages: [] });
  } catch (error) {
    console.error('Messages error:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.get('/api/users', (req, res) => {
  try {
    res.json({ users: [] });
  } catch (error) {
    console.error('Users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/posts/create', (req, res) => {
  try {
    const { content } = req.body;
    const newPost = {
      _id: Date.now().toString(),
      content: content || '',
      media_url: '',
      likes: [],
      comments: [],
      shares: 0,
      createdAt: new Date().toISOString(),
      user: {
        _id: 'user_1',
        profile_picture: '/sample_profile.jpg',
        name: 'User'
      }
    };
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Failed to create post', message: error.message });
  }
});

// 404 handler - must be before error handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler - must be last
app.use((error, req, res, next) => {
  console.error('Global error:', error);
  res.status(error.status || 500).json({ 
    error: 'Internal Server Error',
    message: error.message || 'Unknown error'
  });
});

// Export for Vercel Serverless
export default app;
