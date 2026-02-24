import express from 'express';
import cors from 'cors';

const app = express();

// Middleware - CORS सब कुछ allow करे
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

// Posts
app.get('/api/posts', (req, res) => {
  res.json({ posts: [], success: true });
});

app.post('/api/posts', (req, res) => {
  res.json({ success: true, message: 'Post created' });
});

app.post('/api/posts/create', (req, res) => {
  try {
    const content = req.body ? (req.body.content || '') : '';
    const newPost = {
      _id: String(Date.now()),
      content: content,
      likes: [],
      comments: [],
      createdAt: new Date().toISOString()
    };
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Stories
app.get('/api/stories', (req, res) => {
  res.json({ stories: [], success: true });
});

app.post('/api/stories', (req, res) => {
  res.json({ success: true, message: 'Story created' });
});

// Messages
app.get('/api/messages', (req, res) => {
  res.json({ messages: [], success: true });
});

app.post('/api/messages', (req, res) => {
  res.json({ success: true, message: 'Message sent' });
});

// Users
app.get('/api/users', (req, res) => {
  res.json({ users: [], success: true });
});

app.get('/api/users/:id', (req, res) => {
  res.json({ user: null, success: true });
});

app.patch('/api/users/:id', (req, res) => {
  res.json({ success: true, message: 'User updated' });
});

// Favicon - Don't let it crash
app.get('/favicon.ico', (req, res) => {
  res.status(404).end();
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

export default app;
