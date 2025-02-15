import express from 'express';
import {
  getAllTempSchedules,
  createTempSchedule,
  getTempScheduleById,
  updateTempSchedule,
  deleteTempSchedule,
} from '../controllers/tempScheduleController.js';

const router = express.Router();

router.get('/tempSchedules', getAllTempSchedules);
router.post('/tempSchedules', createTempSchedule);
router.get('/tempSchedules/:id', getTempScheduleById);
router.put('/tempSchedules/:id', updateTempSchedule);
router.delete('/tempSchedules/:id', deleteTempSchedule);

export default router;
