// routes/personalDetailsRoutes.js
import express from 'express';
import {
    createPersonalDetails,
    getAllPersonalDetails,
    getPersonalDetailsById,
    updatePersonalDetailsById,
    deletePersonalDetailsById,
} from '../controllers/personalDetailsController.js';

const router = express.Router();

// CRUD operations
router.post('/personal-details', createPersonalDetails);
router.get('/personal-details', getAllPersonalDetails);
router.get('/personal-details/:id', getPersonalDetailsById);
router.put('/personal-details/:id', updatePersonalDetailsById);
router.delete('/personal-details/:id', deletePersonalDetailsById);

export default router;
