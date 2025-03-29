import express from 'express';
import {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployeeById,
    deleteEmployeeById,
} from '../controllers/employeeController.js';

const router = express.Router();

router.post('/employees', createEmployee);
router.get('/employees', getAllEmployees);
router.get('/employees/:id', getEmployeeById);
router.put('/employees/:id', updateEmployeeById);
router.delete('/employees/:id', deleteEmployeeById);

export default router;