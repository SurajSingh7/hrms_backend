import express from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeByCode,  // Import the new controller method
} from '../controllers/basicEmployeeController.js';

const router = express.Router();

// Employee routes
router.get('/basicemployees', getAllEmployees);
router.get('/basicemployees/:id', getEmployeeById);
router.get('/basicemployees/code/:employeeCode', getEmployeeByCode);  // Add this route for employeeCode
router.post('/basicemployees', createEmployee);
router.put('/basicemployees/:id', updateEmployee);
router.delete('/basicemployees/:id', deleteEmployee);

export default router;










// import express from 'express';
// import {
//   getAllEmployees,
//   getEmployeeById,
//   createEmployee,
//   updateEmployee,
//   deleteEmployee,
// } from '../controllers/basicEmployeeController.js';

// const router = express.Router();

// // Employee routes
// router.get('/basicemployees', getAllEmployees);
// router.get('/basicemployees/:id', getEmployeeById);
// router.post('/basicemployees', createEmployee);
// router.put('/basicemployees/:id', updateEmployee);
// router.delete('/basicemployees/:id', deleteEmployee);

// export default router;
