import { sql } from '../config/db.js';

//get users by id
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

//create user
export async function createUser(req, res) {
    try {
           const {name, email, password_hash} = req.body;
    
            if(!name || !email || !password_hash === undefined) {
            return res.status(400).json({message: 'All fields are required'});
            }
    
              const user =     
                        await sql`INSERT INTO users (name, email, password_hash)
                        VALUES (${name}, ${email}, ${password_hash})
                        RETURNING *`;
                        console.log(user);
                        res.status(201).json(user[0]);

    } catch (error) {
        console.log('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//delete user

export async function deleteUser(req, res) {
    try {
        const {userId} = req.params;
        await sql
        `DELETE FROM users WHERE id = ${userId}`;
        res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        console.log('Error deleting user:', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

//update user details
export async function updateUser(req, res) {
    try {
        const {userId} = req.params;
        const {name, email, password_hash} = req.body;
        const updatedUser = await sql
        `UPDATE users SET name = ${name}, email = ${email}, password_hash = ${password_hash} WHERE id = ${userId} RETURNING *`;
        res.status(200).json(updatedUser[0]);
    } catch (error) {
        console.log('Error updating user:', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}