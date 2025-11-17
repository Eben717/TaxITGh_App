import express from 'express';
import { getUsersById, createUser, deleteUser, updateUser } from '../controller/usersController.js';

const router = express.Router();

router.get('/:userId', getUsersById);

router.post('/', createUser);

router.delete('/:userId', deleteUser);

router.put('/:userId', updateUser);

export default router;