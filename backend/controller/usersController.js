import { sql } from '../config/db.js';

export async function getUsersById(req, res) {
 {
    try {
        const {userId} = req.params;
        const users = await sql`SELECT * FROM users WHERE id = ${userId} ORDER BY created_at DESC`;
        res.status(200).json(users);
         } catch (error) {
        console.log('Error getting the transaction:', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}
}