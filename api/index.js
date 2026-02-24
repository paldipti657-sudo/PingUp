import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send('Server is running 🚀');
});

// Health check
app.get('/health', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ status: 'ok' });
});

// API Routes
app.get('/api/posts', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ posts: [] });
});

app.get('/api/stories', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ stories: [] });
});

app.get('/api/messages', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ messages: [] });
});

app.get('/api/users', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ users: [] });
});

app.post('/api/posts/create', express.json(), (req, res) => {
  try {
    const content = req.body?.content || '';
    const newPost = {
      _id: Date.now().toString(),
      content: content,
      media_url: '',
      likes: [],
      comments: [],
      createdAt: new Date().toISOString()
    };
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(newPost);
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// 404
app.all('*', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(404).json({ error: 'Not found' });
});

export default app;
