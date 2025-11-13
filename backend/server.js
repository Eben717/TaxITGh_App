import express from 'express';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import sql from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 4001

const app = express();

//middleware
app.use(rateLimiter);
app.use(express.json());

app.use((req, res, next) => {
    console.log("Hi from Middleware, we hit a request", req.method);
    next();
});

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