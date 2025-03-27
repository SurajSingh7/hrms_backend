import express from "express";
const router = express.Router();

import CompanyController from "../controllers/company-controller.js";
const companyController = new CompanyController();

router.post("/create", companyController.createCompany);  
router.get("/show", companyController.getCompany);        
router.put("/update/:companyId", companyController.editCompany);  
router.patch("/delete/:companyId", companyController.deleteCompany);

export default router;