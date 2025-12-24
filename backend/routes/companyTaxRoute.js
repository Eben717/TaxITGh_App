import express from 'express';
import { getAllCompanyTaxes, getCompanyTaxesByCompanyId, getCompanyTaxById, createCompanyTax, updateCompanyTax, deleteCompanyTax } from '../controller/companyTaxController.js';

const router = express.Router();

router.get('/', getAllCompanyTaxes);
router.get('/:companyId', getCompanyTaxesByCompanyId);
router.get('/tax/:id', getCompanyTaxById);
router.post('/', createCompanyTax);
router.put('/:id', updateCompanyTax);
router.delete('/:id', deleteCompanyTax);

export default router;