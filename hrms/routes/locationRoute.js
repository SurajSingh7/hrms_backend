import express from 'express';
import { getLocation,getDispensary } from '../controllers/LocationController.js';

const router = express.Router();

// Employee routes
router.get('/location', getLocation);
router.get('/despensary/:id', getDispensary);



export default router;
