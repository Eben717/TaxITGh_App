import express from 'express';
import { sql } from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4001

const app = express();

app.listen(PORT, () => {
    console.log('TaxITGh App Server is running on PORT 4000');
});
