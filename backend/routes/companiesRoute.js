import express from 'express';
import { getCompaniesById, createCompany, updateCompany } from '../controller/companiesController.js';

const router = express.Router();

router.get('/:id', getCompaniesById);

router.post('/', createCompany);

router.put('/:id', updateCompany);



export default router;