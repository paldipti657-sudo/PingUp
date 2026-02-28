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


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});