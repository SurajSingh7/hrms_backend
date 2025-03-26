// routes/businessRoutes.js
import express from 'express';
import { submitBusiness, getAllBusinesses } from '../controllers/companyController.js';

const router = express.Router();

router.post('/submit-business', submitBusiness);
router.get('/businesses', getAllBusinesses);


export default router;
