//use bcrypt to hash password after frontend done

import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors';
import requestLogger from './middlewares/requestLoggerMiddleware.js';
import errorHandler from './middlewares/errorHandlerMiddleware.js';

//routers
import userRouter from './routes/userRouter.js';
import noteRouter from './routes/noteRouter.js';
import authRouter from "./routes/authRouter.js";
import chatroomRouter from "./routes/chatroomRouter.js";
import messageRouter from "./routes/messageRouter.js";
import commentRouter from "./routes/commentRouter.js"

//configs
dotenv.config();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;
const apiBase = (process.env.API_BASE_URL || 'api/v1').trim(); // safe
const app = express();


//middlewares - these should come first
app.use(cors()); // Allow all origins (customize for production)
app.use(requestLogger);
app.use(errorHandler);
app.use(express.json());

//routes
app.use(`/${apiBase}/users`, userRouter);
app.use(`/${apiBase}/notes`, noteRouter);
app.use(`/${apiBase}/auth`, authRouter);
app.use(`/${apiBase}/chatroom`, chatroomRouter);
app.use(`/${apiBase}/message`, messageRouter);
app.use(`/${apiBase}/comment`,commentRouter);

//requests
app.get('/', (req, res) => {
    res.send('Hello World');
});


try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, host, () => {
        console.log(`Server running at http://${host}:${port}`);
    });
} catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
}