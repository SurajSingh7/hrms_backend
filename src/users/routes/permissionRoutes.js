import express from 'express'
import { createPermission, getPermission, updatePermission } from '../controllers/PermissionsController.js';
const router = express.Router();

router.post('/permission',createPermission)
router.put('/permission/:id',updatePermission)
router.get('/permission',getPermission)

export default router;