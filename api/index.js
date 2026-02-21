import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from '../configs/db.js';
import storiesRouter from './stories.js';
import postsRouter from './posts.js';
import messagesRouter from './messages.js';
import usersRouter from './users.js';

const app = express();

// Database connection
connectDB().catch(console.error);

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Server is running'));

// API Routes
app.use('/api/stories', storiesRouter);
app.use('/api/posts', postsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/users', usersRouter);

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server Error:', error)
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: error.message 
    })
})

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

export default app;
