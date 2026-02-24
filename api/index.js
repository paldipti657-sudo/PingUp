import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

// Health
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Posts
app.get('/api/posts', (req, res) => {
  res.json({ posts: [] });
});

// Stories
app.get('/api/stories', (req, res) => {
  res.json({ stories: [] });
});

// Messages
app.get('/api/messages', (req, res) => {
  res.json({ messages: [] });
});

// Users
app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

// Create Post
app.post('/api/posts/create', (req, res) => {
  const content = req.body ? req.body.content : '';
  const newPost = {
    _id: String(Date.now()),
    content: content || '',
    createdAt: new Date().toISOString()
  };
  res.status(201).json(newPost);
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export default app;
