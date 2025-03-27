import express from "express";

import shiftRoutes from "../users/routes/shiftRoutes.js";
import tempScheduleRoutes from "../users/routes/tempScheduleRoutes.js";
import employeeEnrollMappingRoutes from "../users/routes/employeeEnrollMappingRoutes.js";
import weekOffRoutes from "../users/routes/weekOffRoutes.js";
import basicEmployeeRoutes from "../users/routes/basicEmployeeRoutes.js";
import employeeRoutes from "../users/routes/employeeRoutes.js";
import financialDetailRoutes from "../users/routes/financialDetailRoutes.js";
import personalDetailsRoutes from "../users/routes/personalDetailsRoutes.js";
import requestRoutes from "../users/routes/requestRoutes.js";
import authRoutes from "../users/routes/authRoutes.js";
import roleRoutes from "../users/routes/roleRoutes.js";
import departmentRoutes from "../users/routes/departmentRoutes.js";
import documentRoutes from "../users/routes/documentRoutes.js";
import sendMessageRoutes from "../users/routes/sendMessageRoutes.js";

const router = express.Router();

router.use(shiftRoutes);
router.use(tempScheduleRoutes);
router.use(employeeEnrollMappingRoutes);
router.use(weekOffRoutes);
router.use(basicEmployeeRoutes);
router.use(employeeRoutes);
router.use(financialDetailRoutes);
router.use(personalDetailsRoutes);
router.use(requestRoutes);
router.use(authRoutes);
router.use(roleRoutes);
router.use(departmentRoutes);
router.use(sendMessageRoutes);
router.use(documentRoutes);

export default router;
