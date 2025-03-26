import express from 'express';
import { getAttendanceReport,createAttendanceReport,nextEmpCode} from '../controllers/HrmsController.js';
const router = express.Router();

// router.route('/').post(HrmsController.createPunchLogs)
// router.route('/').get(HrmsController.getPunchLogs);
router.get('/attendance',getAttendanceReport);
router.get('/createattendance',createAttendanceReport);
router.get('/next-employee-code',nextEmpCode);


export default router;