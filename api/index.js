import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import testInngest from './test-inngest.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Server is running'));
app.use('/api/inngest', testInngest);

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
