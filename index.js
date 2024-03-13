import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import DBconnection from './db.js';
import userRoute from './router/user_route.js';
import authRoute from './router/auth.js';
// body-parser , path
dotenv.config();
DBconnection();

const app = express();
app.use(express.json());
app.use(cors());

app.use("api/users", userRoute);
app.use("api/auth", authRoute);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})