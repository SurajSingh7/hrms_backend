import express from "express";
const router = express.Router();

import dispensaryRoutes from "../dispensaryManagement/routes/dispensary-location-route.js";
import companyRoutes from "../company/routes/company-route.js";
import roleManagementRoutes from "../roleManagement/routes/role-management-route.js";

router.use("/dispensary", dispensaryRoutes);
router.use("/control-pannel/company", companyRoutes);
router.use("/role-management", roleManagementRoutes);

export default router;