import express from "express";
const router =  express.Router();

import RoleManagementController from "../controllers/role-management-controller.js";
const roleManagementController = new RoleManagementController();

router.post("/department/create", roleManagementController.createDepartment);
router.get("/department/get-all", roleManagementController.getAllDepartments);
router.get("/department/get/:id", roleManagementController.getDepartmentById);
router.put("/department/update/:id", roleManagementController.updateDepartment);
router.patch("/department/delete/:id", roleManagementController.softDeleteDepartment);

router.post("/roles/create", roleManagementController.createRole);
router.get("/roles/get-all", roleManagementController.getAllRoles);
router.get("/roles/get/:id", roleManagementController.getRoleById);
router.put("/roles/update/:id", roleManagementController.updateRole);
router.patch("/roles/delete/:id", roleManagementController.softDeleteRole);

router.post('/modules/create', roleManagementController.createModule);
router.get('/modules/get-all', roleManagementController.getAllModule);
router.get('/modules/get/:id', roleManagementController.getModuleById);
router.put('/modules/update/:id', roleManagementController.updateModule);
router.patch('/modules/delete/:id', roleManagementController.softDeleteModule);

router.post('/permission/create', roleManagementController.createPermission);
router.get('/permission/get-all', roleManagementController.getAllPermission);
router.get('/permission/get/:id', roleManagementController.getPermissionById);
router.put('/permission/update/:id', roleManagementController.updatePermission);
router.patch('/permission/delete/:id', roleManagementController.softDeletePermission);

export default router;