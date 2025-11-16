import express from 'express';
import { getUsersById } from '../controller/usersController.js';

const router = express.Router();

router.get('/:userId', getUsersById);






export default router;