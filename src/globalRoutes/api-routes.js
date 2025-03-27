import express from "express";
import dispensaryRoutes from "../dispensaryManagement/routes/dispensary-location-route.js";
import companyRoutes from "../company/routes/company-route.js";

const router = express.Router();

router.use("/dispensary", dispensaryRoutes);
router.use("/control-pannel/company", companyRoutes);

export default router;
