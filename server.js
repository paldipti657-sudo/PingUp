import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import {inngest, functions} from './inngest/index.js'
import {serve} from 'inngest/express'
const app = express();

// Database connection will be handled per request
// await connectDB();

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> res.send('Server is running'))
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
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' })
})


const PORT = process.env.PORT || 4000;


app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
