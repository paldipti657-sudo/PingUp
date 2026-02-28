import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import {inngest} from './inngest/index.js'
import {functions} from './inngest/functions.js'
import {serve} from 'inngest/express'
import storiesRouter from './api/stories.js';
import postsRouter from './api/posts.js';
import messagesRouter from './api/messages.js';
import usersRouter from './api/users.js';

const app = express();

// Database connection
connectDB().catch(console.error);

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> res.send('Server is running'))

// API Routes
app.use('/api/stories', storiesRouter);
app.use('/api/posts', postsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/users', usersRouter);

app.use('/api/inngest',serve({ client: inngest, functions }))

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


// Export for Vercel serverless
export default app;

// Local development only
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
    


});
}
