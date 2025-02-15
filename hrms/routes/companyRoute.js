import express from "express";
import { createCompany, getCompany, editCompany, deleteCompany } from "../controllers/CompanyController.js";

const router = express.Router();

router.post("/company/create", createCompany);  // Create a new company
router.get("/company/show", getCompany);        // Get all companies
router.put("/company/edit/:companyId", editCompany);  // Edit company by ID
router.delete("/company/delete/:companyId", deleteCompany);  // Delete company by ID

export default router;






// import express from 'express';
// import { createCompany, getCompany } from '../controllers/CompanyController.js';
// const router = express.Router();

// // router.route('/').post(HrmsController.createPunchLogs)
// // router.route('/').get(HrmsController.getPunchLogs);
// router.post('/company/create',createCompany);
// router.get('/company/show',getCompany);


// export default router;