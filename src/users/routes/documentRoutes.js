// routes/documentRoute.js
import express from 'express';

import { createDocument } from '../controllers/documentController.js';

const router = express.Router();

// CRUD operations
router.post('/document', createDocument);

export default router;
