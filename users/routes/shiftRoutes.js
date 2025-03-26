import express from 'express';
import {
  getAllShifts,
  createShift,
  getShiftById,
  updateShift,
  deleteShift,
} from '../controllers/shiftController.js';

const router = express.Router();

router.get('/shifts', getAllShifts);
router.post('/shifts', createShift);
router.get('/shifts/:id', getShiftById);
router.put('/shifts/:id', updateShift);
router.delete('/shifts/:id', deleteShift);

export default router;
