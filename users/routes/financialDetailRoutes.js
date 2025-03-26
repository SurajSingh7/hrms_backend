// routes/financialDetailRoutes.js
import express from 'express';
import {
    createFinancialDetail,
    getAllFinancialDetails,
    getFinancialDetailById,
    updateFinancialDetailById,
    deleteFinancialDetailById,
} from '../controllers/financialDetailController.js';

const router = express.Router();

// CRUD operations
router.post('/financial-details', createFinancialDetail);
router.get('/financial-details', getAllFinancialDetails);
router.get('/financial-details/:id', getFinancialDetailById);
router.put('/financial-details/:id', updateFinancialDetailById);
router.delete('/financial-details/:id', deleteFinancialDetailById);

export default router;
