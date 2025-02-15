import express from 'express';
import {
    createDepartment,
    getDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
} from '../controllers/DepartmentController.js';

const router = express.Router();

// Create a new department
router.post('/departments', createDepartment);

// Get all departments
router.get('/departments', getDepartments);

// Get a single department by ID
router.get('/departments/:id', getDepartmentById);

// Update a department by ID
router.put('/departments/:id', updateDepartment);

// Delete a department by ID
router.delete('/departments/:id', deleteDepartment);

export default router;
