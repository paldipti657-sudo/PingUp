import Express from 'express';
import Cors from 'cors';

const app = new Express();

app.use(Cors());
app.use(Express.json());

app.get('/', (req, res) => {
  res.status(200).send('Server is running 🚀');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/posts', (req, res) => {
  res.status(200).json({ posts: [] });
});

app.get('/api/stories', (req, res) => {
  res.status(200).json({ stories: [] });
});

app.get('/api/messages', (req, res) => {
  res.status(200).json({ messages: [] });
});

app.get('/api/users', (req, res) => {
  res.status(200).json({ users: [] });
});

app.post('/api/posts/create', (req, res) => {
  const content = req.body?.content || '';
  const newPost = {
    _id: Date.now().toString(),
    content: content,
    createdAt: new Date().toISOString()
  };
  res.status(201).json(newPost);
});

app.all('*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export default app;
