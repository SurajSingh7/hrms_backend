import express from 'express';
import {
  getAllEmployeeEnrollMappings,
  createEmployeeEnrollMapping,
  getEmployeeEnrollMappingById,
  updateEmployeeEnrollMapping,
  deleteEmployeeEnrollMapping,
} from '../controllers/employeeEnrollMappingController.js';

const router = express.Router();

router.get('/employeeEnrollMappings', getAllEmployeeEnrollMappings);
router.post('/employeeEnrollMappings', createEmployeeEnrollMapping);
router.get('/employeeEnrollMappings/:id', getEmployeeEnrollMappingById);
router.put('/employeeEnrollMappings/:id', updateEmployeeEnrollMapping);
router.delete('/employeeEnrollMappings/:id', deleteEmployeeEnrollMapping);

export default router;
