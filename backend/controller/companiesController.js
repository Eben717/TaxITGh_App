import {sql} from "../config/db.js";
//get companies by id
export async function getCompaniesById(req, res) {
    try {
        const { companiesId } = req.params;
        const company = await sql`SELECT * FROM companies WHERE id = ${companiesId}`;
        res.json(company);
    } catch (error) {
        console.error('Error fetching company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}   

//create company
export async function createCompany(req, res) {
    try {
        const { name, address, registration_information, name_of_directors, name_of_auditors, industry, contact_information, tax_identification_number } = req.body;
        
        const company = 
        await sql`INSERT INTO companies (name, address, registration_information, name_of_directors, name_of_auditors, industry, contact_information, tax_identification_number) 
        VALUES 
        (${name}, ${address}, ${registration_information}, ${name_of_directors}, ${name_of_auditors}, ${industry}, ${contact_information}, ${tax_identification_number}) 
        RETURNING *`;
        console.log(company);
        res.status(201).json(company[0]);
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//update company 
export async function updateCompany(req, res) {
    try {
        const { companiesId } = req.params;
        const { name, address, registration_information, name_of_directors, name_of_auditors, industry, contact_information, tax_identification_number } = req.body;
        const company = await sql`UPDATE companies SET name = ${name}, address = ${address}, registration_information = ${registration_information}, name_of_directors = ${name_of_directors}, name_of_auditors = ${name_of_auditors}, industry = ${industry}, contact_information = ${contact_information}, tax_identification_number = ${tax_identification_number} WHERE id = ${companiesId} RETURNING *`;
        res.json(company);
    } catch (error) {
        console.error('Error updating company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//delete company
export async function deleteCompany(req, res) {
    try {
        const { companiesId } = req.params;
        await sql`DELETE FROM companies WHERE id = ${companiesId}`;
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        console.error('Error deleting company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}