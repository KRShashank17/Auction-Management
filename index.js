import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import DBconnection from './db.js';
// body-parser , path

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

DBconnection();

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})