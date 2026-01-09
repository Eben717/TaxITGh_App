import {sql} from '../config/db.js';

// Get all company taxes
export async function getAllCompanyTaxes(req, res) {
    try {
        const taxes = await sql`SELECT * FROM company_tax`;
        res.json(taxes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get company taxes by company ID
export async function getCompanyTaxesByCompanyId(req, res) {
    try {
        const { companyId } = req.params;
        const taxes = await sql`SELECT * FROM company_tax WHERE company_id = ${companyId}`;
        res.json(taxes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get single company tax by ID
export async function getCompanyTaxById(req, res) {
    try {
        const { id } = req.params;
        const tax = await sql`SELECT * FROM company_tax WHERE id = ${id}`;
        res.json(tax[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create company tax
export async function createCompanyTax(req, res) {
    try {
        const { company_id, tax_type_id, applicable_from, applicable_to, status } = req.body;
        const result = await sql`INSERT INTO company_tax (company_id, tax_type_id, applicable_from, applicable_to, status) VALUES (${company_id}, ${tax_type_id}, ${applicable_from}, ${applicable_to}, ${status || 'active'}) RETURNING *`;
        res.status(201).json(result[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update company tax
export async function updateCompanyTax(req, res) {
    try {
        const { id } = req.params;
        const { applicable_to, status } = req.body;
        const result = await sql`UPDATE company_tax SET applicable_to = ${applicable_to}, status = ${status} WHERE id = ${id} RETURNING *`;
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete company tax
export async function deleteCompanyTax(req, res) {
    try {
        const { id } = req.params;
        await sql`DELETE FROM company_tax WHERE id = ${id}`;
        res.json({ message: 'Company tax deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}