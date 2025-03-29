import express from 'express';

import { createDocument } from '../controllers/documentController.js';

const router = express.Router();

router.post('/document', createDocument);

export default router;
