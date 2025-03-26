import express from 'express';
const router = express.Router();

import dispensaryLocationController from '../controllers/dispensary-location-controller.js';
const dispensaryLocationCtrl = new dispensaryLocationController();

import ResponseHandler from '../../../utils/response-handler.js';
import {dispensaryLocationValidator,dispensaryLocationIdValidator} from "../validators/dispensary-data-validator.js";

router.post("/create",dispensaryLocationValidator, ResponseHandler.handleValidationErrors, dispensaryLocationCtrl.createDispensary);
router.get("/get-all", dispensaryLocationCtrl.getDispensary);
router.get("/get/:id", dispensaryLocationIdValidator, ResponseHandler.handleValidationErrors, dispensaryLocationCtrl.getDispensaryById);
router.put("/update/:id",dispensaryLocationIdValidator,ResponseHandler.handleValidationErrors, dispensaryLocationCtrl.updateDispensary);
router.delete("/delete/:id",dispensaryLocationIdValidator,ResponseHandler.handleValidationErrors, dispensaryLocationCtrl.deleteDispensary);

export default router;