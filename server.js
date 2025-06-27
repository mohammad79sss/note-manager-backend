//use bcrypt to hash password after frontend done

import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors';
//routers
import userRouter from './routes/userRouter.js';
import noteRouter from './routes/noteRouter.js';
import authRouter from "./routes/authRouter.js";

//configs
dotenv.config();
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;
const apiBase = (process.env.API_BASE_URL || 'api/v1').trim(); // safe
const app = express();


//middlewares - these should come first
app.use(cors()); // Allow all origins (customize for production)
app.use(express.json());

//routes
app.use(`/${apiBase}/users`, userRouter);  // Add leading slash
app.use(`/${apiBase}/notes`, noteRouter);  // Add leading slash
app.use(`/${apiBase}/auth`, authRouter);  // Add leading slash

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