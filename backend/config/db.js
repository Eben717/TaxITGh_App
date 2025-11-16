import { neon } from "@neondatabase/serverless";

import "dotenv/config";

// CREATE sql connection using DB URL from .env file   
export const sql = neon(process.env.DATABASE_URL);  

export async function initDB() {
    try {
        await sql
        `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) ,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
        
        console.log('Database initialized successfully');
    }
    catch (error) {
        console.error('Error initializing database:', error);
    }
}


export default sql;