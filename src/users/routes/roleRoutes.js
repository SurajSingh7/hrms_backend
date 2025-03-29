import express from 'express'
import { createRole, getRole, updateRole } from '../controllers/RolesController.js'
const router = express.Router();

router.post('/role/create',createRole);
router.put("/role/:id", updateRole);
router.get('/role',getRole);

export default router;