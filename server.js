import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { inngest } from "./inngest/index.js";
import { functions } from "./inngest/functions.js";
import { serve } from "inngest/express";

import storiesRouter from "./api/stories.js";
import postsRouter from "./api/posts.js";
import messagesRouter from "./api/messages.js";
import usersRouter from "./api/users.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// db
connectDB().then(() => {
  console.log("Database connected");
}).catch(console.error);

// routes
app.get("/", (req, res) => {
  res.send("PingUp backend running 🚀");
});

app.use("/api/stories", storiesRouter);
app.use("/api/posts", postsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/users", usersRouter);

app.use("/api/inngest", serve({ client: inngest, functions }));

// ❌ REMOVE serverless export
// export default app;

// ✅ ALWAYS listen (Render requirement)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});