import express from 'express';
import { getUsersById, createUser } from '../controller/usersController.js';

const router = express.Router();

router.get('/:userId', getUsersById);

router.post('/', createUser);




export default router;