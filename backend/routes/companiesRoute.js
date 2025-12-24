import express from 'express';
import { getCompaniesById, createCompany, updateCompany } from '../controller/companiesController.js';

const router = express.Router();

router.get('/:companiesId', getCompaniesById);

router.post('/', createCompany);

router.put('/:companiesId', updateCompany);


export default router;