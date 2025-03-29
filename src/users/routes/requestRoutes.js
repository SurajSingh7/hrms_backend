import express from 'express';
import {
    createRequest,
    getAllRequests,
    getRequestById,
    updateRequestById,
    deleteRequestById,
} from '../controllers/requestController.js';

const router = express.Router();

// CRUD operations
router.post('/requests', createRequest);
router.get('/requests', getAllRequests);
router.get('/requests/:id', getRequestById);
router.put('/requests/:id', updateRequestById);
router.delete('/requests/:id', deleteRequestById);

export default router;