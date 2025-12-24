import { neon } from "@neondatabase/serverless";

import "dotenv/config";

// CREATE sql connection using DB URL from .env file   
export const sql = neon(process.env.DATABASE_URL);  

export async function initDB() {
    try {
        //users database table
        await sql
        `CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) ,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;
        
        //companies database table
        await sql
        `CREATE TABLE IF NOT EXISTS companies (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            registration_information VARCHAR(255) NOT NULL,
            name_of_directors VARCHAR(255) NOT NULL,
            name_of_auditors VARCHAR(255) NOT NULL,
            industry VARCHAR(255) NOT NULL,
            contact_information VARCHAR(255) NOT NULL,
            tax_identification_number VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER NOT NULL,
            CONSTRAINT fk_company_user
            FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
        )`;
        
        // Company tax data database table
        await sql
        `CREATE TABLE IF NOT EXISTS company_tax (
        id SERIAL PRIMARY KEY,
        company_id INTEGER NOT NULL,
        tax_type_id INTEGER NOT NULL,
        applicable_from DATE NOT NULL,
        applicable_to DATE,
        status VARCHAR(30) NOT NULL DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_companytax_company
          FOREIGN KEY (company_id)
          REFERENCES companies(id)
          ON DELETE CASCADE,

        CONSTRAINT fk_companytax_taxtype
          FOREIGN KEY (tax_type_id)
          REFERENCES tax_types(id)
          ON DELETE RESTRICT
      );
    `;

        //Tax types database table
        await sql
        `CREATE TABLE IF NOT EXISTS tax_types (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT,
            rate DECIMAL(5,2) NOT NULL,
            category VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;

        //Tax calculations database table
        await sql
        `CREATE TABLE IF NOT EXISTS tax_calculations (
        id SERIAL PRIMARY KEY,
        company_tax_id INTEGER NOT NULL,
        taxable_income DECIMAL(15,2) NOT NULL,
        tax_rate DECIMAL(5,2) NOT NULL,
        amount DECIMAL(15,2) NOT NULL,
        tax_period VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_taxcalc_companytax
        FOREIGN KEY (company_tax_id)
        REFERENCES company_tax(id)
        ON DELETE CASCADE
      );
    `;


        console.log('Database initialized successfully');
    }
    catch (error) {
        console.error('Error initializing database:', error);
    }
}


export default sql;