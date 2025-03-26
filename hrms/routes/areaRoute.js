import express from 'express';
import { getAreas } from '../controllers/AreaController.js';
const router = express.Router();

// Employee routes
router.get('/area', getAreas);

export default router;
