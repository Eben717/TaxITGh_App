import express from 'express';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import { initDB } from './config/db.js';
import usersRoute from './routes/usersRoute.js';
import companiesRoute from './routes/companiesRoute.js';

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

app.use('/api/users', usersRoute);
app.use('/api/companies', companiesRoute);

initDB().then(() => {

app.listen(PORT, () => {
    console.log('TaxITGh App Server is running on PORT 4001');
});
});