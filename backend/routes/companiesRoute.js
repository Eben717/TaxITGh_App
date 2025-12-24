import express from 'express';
import { getCompaniesById, createCompany, updateCompany, deleteCompany } from '../controller/companiesController.js';

const router = express.Router();

router.get('/:companiesId', getCompaniesById);

router.post('/', createCompany);

router.put('/:companiesId', updateCompany);

router.delete('/:companiesId', deleteCompany);



export default router;