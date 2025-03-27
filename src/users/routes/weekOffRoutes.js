import express from 'express';
import {
  getAllWeekOffs,
  createWeekOff,
  getWeekOffById,
  updateWeekOff,
  deleteWeekOff,
} from '../controllers/weekOffController.js';

const router = express.Router();

router.get('/weekOffs', getAllWeekOffs);
router.post('/weekOffs', createWeekOff);
router.get('/weekOffs/:id', getWeekOffById);
router.put('/weekOffs/:id', updateWeekOff);
router.delete('/weekOffs/:id', deleteWeekOff);

export default router;
