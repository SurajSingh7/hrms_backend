// routes/roleRoutes.js
import express from 'express';
import {
    createRole,
    getAllRoles,
    getRoleById,
    updateRoleById,
    deleteRoleById,
} from '../controllers/roleController.js';

const router = express.Router();

// CRUD operations
router.post('/roles', createRole);
router.get('/roles', getAllRoles);
router.get('/roles/:id', getRoleById);
router.put('/roles/:id', updateRoleById);
router.delete('/roles/:id', deleteRoleById);

export default router;
