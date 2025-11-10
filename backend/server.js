import express from 'express';
import dotenv from 'dotenv';
import sql from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 4001

const app = express();

async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100) UNIQUE,
            password VARCHAR(100)
        )`;
        console.log('Database initialized successfully');
    }
    catch (error) {
        console.error('Error initializing database:', error);
    }
}

app.get('/', (req, res) => {
    res.send('Welcome to the TaxITGh App Server');
});

initDB().then(() => {

app.listen(PORT, () => {
    console.log('TaxITGh App Server is running on PORT 4001');
});
});