import permissonModel from "../models/permisson-model.js";
import roleModel from "../models/role-model.js";
import departmentModel from "../models/department-model.js";
import moduleModel from "../models/modules-model.js";

import DBHelper from "../../../utils/db-helper.js";
import ResponseHandler from "../../../utils/response-handler.js";
import PaginationHandler from "../../../utils/pagination-handler.js";

export default class RoleManagementController {
    
    createRole = async(req,res)=>{
        try{
            const findExistingRole = await DBHelper.findByCriteria(roleModel, {name:req.body.name});
            if(findExistingRole){
                return ResponseHandler.error(res, "Role already exist", 400);
            }
            const createRole = await DBHelper.create(roleModel, req.body);
            if(!createRole){
                return ResponseHandler.error(res,"failed to create role", 400);
            }

            return ResponseHandler.success(res, "Role created successfully"," "," ", 200);
        }
        catch(error){
            console.log(`An error occurred while creating role in Role management service class : ${error}`);
            if(error instanceof Error){
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while creating role", 400);
        }
    }

    getAllRoles = async(req, res) => {
        try {
            const { page,limit,skip} = PaginationHandler.paginate(req);

            let query = {status: true};

            if (req.query.status !== undefined) {
                query.status = req.query.status === "false" ? false : true;
            }

            const totalRecords = await roleModel.countDocuments();
            const roles = await DBHelper.findAllOrFail(roleModel, skip, limit, { createdAt: -1 }, query);

            if(!roles) {
                return ResponseHandler.error(res, "No roles found", 404);
            }
            const pagination = PaginationHandler.paginateReturn(page, limit, totalRecords, roles.length)
            return ResponseHandler.success(res, "Roles fetched successfully", roles, pagination, 200);
        } catch(error) {
            console.log(`An error occurred while fetching roles: ${error}`);
            if(error instanceof Error) {
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while fetching roles", 400);
        }
    }

    getRoleById = async(req, res) => {
        try {
            const { id } = req.params;
            const role = await DBHelper.findByIdOrFail(roleModel, id);
            if(!role) {
                return ResponseHandler.error(res, "Role not found", 404);
            }
            return ResponseHandler.success(res, "Role fetched successfully", role, "", 200);
        } catch(error) {
            console.log(`An error occurred while fetching role by ID: ${error}`);
            if(error instanceof Error) {
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while fetching role", 400);
        }
    }

    updateRole = async(req, res) => {
        try {
            const { id } = req.params;
            const existingRole = await DBHelper.findByIdOrFail(roleModel, id);
            if(!existingRole) {
                return ResponseHandler.error(res, "Role not found", 404);
            }
            
            // Check if name is being updated to an existing name
            if(req.body.name && req.body.name !== existingRole.name) {
                const roleWithSameName = await DBHelper.findByCriteria(roleModel, { name: req.body.name });
                if(roleWithSameName) {
                    return ResponseHandler.error(res, "Role with this name already exists", 400);
                }
            }
            
            const updatedRole = await DBHelper.update(roleModel, id, req.body);
            if(!updatedRole) {
                return ResponseHandler.error(res, "Failed to update role", 400);
            }
            return ResponseHandler.success(res, "Role updated successfully", updatedRole, "", 200);
        } catch(error) {
            console.log(`An error occurred while updating role: ${error}`);
            if(error instanceof Error) {
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while updating role", 400);
        }
    }

    softDeleteRole = async(req, res) => {
        try {
            const { id } = req.params;
            const role = await DBHelper.findByIdOrFail(roleModel, id);
            if(!role) {
                return ResponseHandler.error(res, "Role not found", 404);
            }
            const newStatus = !role.status

            const softDeletedRole = await DBHelper.softDelete(roleModel, newStatus, id);
            if(!softDeletedRole) {
                return ResponseHandler.error(res, "Failed to soft delete role", 400);
            }
            return ResponseHandler.success(res, "Role soft deleted successfully", "", "", 200);
        } catch(error) {
            console.log(`An error occurred while soft deleting role: ${error}`);
            if(error instanceof Error) {
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while soft deleting role", 400);
        }
    }

    createPermission = async(req,res)=>{
        try{
            const findExistingPermission = await DBHelper.findByCriteria(permissonModel, {code:req.body.code});
            if(findExistingPermission){
                return ResponseHandler.error(res, "Permission already exist", 400);
            }
            const createPermission = await DBHelper.create(permissonModel, req.body);
            if(!createPermission){
                return ResponseHandler.error(res,"failed to create permission", 400);
            }
            return ResponseHandler.success(res, "Permission created successfully",createPermission," ", 200);
        }
        catch(error){
            console.log(`An error occurred while creating permission in Role management service class : ${error}`);
            if(error instanceof Error){
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while creating permission", 400);
        }
    }

    getAllPermission = async(req, res) => {
        try {
            const { page,limit,skip} = PaginationHandler.paginate(req);
            let query ={status : true};

            if (req.query.status !== undefined) {
                query.status = req.query.status === "false" ? false : true;
            }
            const data = await DBHelper.findAllOrFail(permissonModel, skip, limit, { createdAt: -1 }, query);
            if(!data) {
                return ResponseHandler.error(res, "No data found", 404);
            }
            const totalRecords = await permissonModel.countDocuments();
            const pagination = PaginationHandler.paginateReturn(page, limit, totalRecords, data.length);
 
            return ResponseHandler.success(res, "permission fetched successfully", data, pagination, 200);
        } catch(error) {
            console.log(`An error occurred while fetching permission: ${error}`);
            if(error instanceof Error) {
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while fetching permission", 400);
        }
    }

    getPermissionById = async(req, res) => {
        try {
            const { id } = req.params;
            const data = await DBHelper.findByIdOrFail(permissonModel, id);
            if(!data) {
                return ResponseHandler.error(res, "data not found", 404);
            }
            return ResponseHandler.success(res, "permission fetched successfully", data, "", 200);
        } catch(error) {
            console.log(`An error occurred while fetching permission by ID: ${error}`);
            if(error instanceof Error) {
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while fetching permission", 400);
        }
    }

    updatePermission = async(req, res) => {
        try {
            const { id } = req.params;
            const existingData = await DBHelper.findByIdOrFail(permissonModel, id);
            if(!existingData) {
                return ResponseHandler.error(res, "data not found", 404);
            }
            
            // Check if name is being updated to an existing name
            if(req.body.code && req.body.code !== existingData.code) {
                const dataWithSameName = await DBHelper.findByCriteria(permissonModel, { code: req.body.code });
                if(dataWithSameName) {
                    return ResponseHandler.error(res, "permisson with this name already exists", 400);
                }
            }
            const updatePermission = await DBHelper.update(permissonModel, id, req.body);
            if(!updatePermission) {
                return ResponseHandler.error(res, "Failed to update permission", 400);
            }
            return ResponseHandler.success(res, "permission updated successfully", updatePermission, "", 200);
        } catch(error) {
            console.log(`An error occurred while updating permission: ${error}`);
            if(error instanceof Error) {
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while updating permission", 400);
        }
    }

    softDeletePermission = async(req, res) => {
        try {
            const { id } = req.params;
            const data = await DBHelper.findByIdOrFail(permissonModel, id);
            if(!data) {
                return ResponseHandler.error(res, "Role not found", 404);
            }
            const newStatus = !data.status

            const softDeletedPermission = await DBHelper.softDelete(permissonModel, newStatus, id);
            if(!softDeletedPermission) {
                return ResponseHandler.error(res, "Failed to soft delete permission", 400);
            }
            return ResponseHandler.success(res, "permission soft deleted successfully", "", "", 200);
        } catch(error) {
            console.log(`An error occurred while soft deleting permission: ${error}`);
            if(error instanceof Error) {
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while soft deleting permission", 400);
        }
    }

    createDepartment = async(req,res)=>{
        try{
            const findExistingDepartment = await DBHelper.findByCriteria(departmentModel, {name:req.body.name});
            if(findExistingDepartment){
                return ResponseHandler.error(res, "Department already exist", 400);
            }
            const createDepartment = await DBHelper.create(departmentModel, req.body);
            if(!createDepartment){
                return ResponseHandler.error(res,"failed to create Department", 400);
            }
            return ResponseHandler.success(res, "Department created successfully",createDepartment," ", 200);
        }
        catch(error){
            console.log(`An error occurred while creating Department in Role management service class : ${error}`);
            if(error instanceof Error){
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while creating Department", 400);
        }
    }

    getAllDepartments = async(req, res) => {
        try {
            const { page,limit,skip} = PaginationHandler.paginate(req);
            
            let query = {status : true};

            if (req.query.status !== undefined) {
                query.status = req.query.status === "false" ? false : true;
            }

            const data = await DBHelper.findAllOrFail(departmentModel, skip, limit, { createdAt: -1 }, query);
            if(!data) {
                return ResponseHandler.error(res, "No department found", 404);
            }
            const totalRecords = await departmentModel.countDocuments();
            const pagination = PaginationHandler.paginateReturn(page, limit, totalRecords, data.length);
 
            return ResponseHandler.success(res, "department fetched successfully", data, pagination, 200);
        } catch(error) {
            console.log(`An error occurred while fetching department: ${error}`);
            if(error instanceof Error) {
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while fetching department", 400);
        }
    }

    getDepartmentById = async(req, res) => {
        try {
            const { id } = req.params;
            const data = await DBHelper.findByIdOrFail(departmentModel, id);
            if(!data) {
                return ResponseHandler.error(res, "department not found", 404);
            }
            return ResponseHandler.success(res, "Department fetched successfully", data, "", 200);
        } catch(error) {
            console.log(`An error occurred while fetching department by ID: ${error}`);
            if(error instanceof Error) {
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while fetching department", 400);
        }
    }

    updateDepartment = async(req, res) => {
        try {
            const { id } = req.params;
            const existingData = await DBHelper.findByIdOrFail(departmentModel, id);

            if(!existingData) {
                return ResponseHandler.error(res, "data not found", 404);
            }

            // find the id is valid if parent_id present in req body
            if(req.body.parent_id) {
                const parentData = await DBHelper.findByIdOrFail(departmentModel, req.body.parent_id);

                if(!parentData) {
                    return ResponseHandler.error(res, "Parent department not found", 404);
                }
                else if(parentData.status === false) {
                    return ResponseHandler.error(res, "Parent department is inactive", 400);
                }
            }
            
            // Check if name is being updated to an existing name
            if(req.body.name && req.body.name !== existingData.name) {
                const dataWithSameName = await DBHelper.findByCriteria(departmentModel, { name: req.body.name });
                if(dataWithSameName) {
                    return ResponseHandler.error(res, "department with this name already exists", 400);
                }
            }
            
            const updateDepartment = await DBHelper.update(departmentModel, id, req.body);
            if(!updateDepartment) {
                return ResponseHandler.error(res, "department to update permission", 400);
            }
            return ResponseHandler.success(res, "department updated successfully", updateDepartment, "", 200);
        } catch(error) {
            console.log(`An error occurred while updating department: ${error}`);
            if(error instanceof Error) {
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while updating department", 400);
        }
    }

    softDeleteDepartment = async(req, res) => {
        try {
            const { id } = req.params;
            const data = await DBHelper.findByIdOrFail(departmentModel, id);
            if(!data) {
                return ResponseHandler.error(res, "department not found", 404);
            }
            const newStatus = !data.status

            const softDeleteDepartment = await DBHelper.softDelete(departmentModel, newStatus, id);
            if(!softDeleteDepartment) {
                return ResponseHandler.error(res, "Failed to soft delete department", 400);
            }
            return ResponseHandler.success(res, "department soft deleted successfully", "", "", 200);
        } catch(error) {
            console.log(`An error occurred while soft deleting department: ${error}`);
            if(error instanceof Error) {
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while soft deleting department", 400);
        }
    }

    createModule = async(req, res) => {
        try{
            const {name, description, url, icon,parent_id,display_order,is_menu_item} = req.body;

            const existingModule = await DBHelper.findByCriteria(moduleModel, {name : name});
            if(existingModule) {
                return ResponseHandler.error(res, "module with this name already exists", 400);
            }
            // Find valid parent id 
            if(parent_id){
                const parentModule = await DBHelper.findByCriteria(moduleModel, {parent_id : parent_id});

                if(!parentModule) {
                    return ResponseHandler.error(res, "Invalid or Inactive parent module id", 400);
                }
            }

            const data = await DBHelper.create(moduleModel, {name, description, url, icon,parent_id,display_order ,is_menu_item});
            if(!data) {
                return ResponseHandler.error(res, "Failed to create module", 400);
            }
            return ResponseHandler.success(res, "module created successfully", data, "", 200);

        }
        catch(error){
            console.log(`An error occurred while creating module: ${error}`);
            if(error instanceof Error) {
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while creating module", 400);
        }
    }

    updateModule = async(req, res) => {
        try{
            const { id } = req.params;
            const data = await DBHelper.findByIdOrFail(moduleModel, id);
            if(!data) {
                return ResponseHandler.error(res, "module not found", 404);
            }
            const { name, description, url, icon,parent_id,display_order,is_menu_item } = req.body;

            if(req.body.name && req.body.name !== data.name) {
                const dataWithSameName = await DBHelper.findByCriteria(moduleModel, { name: req.body.name });
                if(dataWithSameName) {
                    return ResponseHandler.error(res, "module with this name already exists", 400);
                }
            }
            
            const updatedData = await DBHelper.update(moduleModel, id, { name, description, url, icon,parent_id,display_order,is_menu_item });
            if(!updatedData) {
                return ResponseHandler.error(res, "Failed to update module", 400);
            }
            return ResponseHandler.success(res, "module updated successfully", "", "", 200);

        }
        catch(error){
            console.log(`An error occurred while updating module: ${error}`);
            if(error instanceof Error) {
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while updating module", 400);
        }
    }

    getAllModule = async(req, res) => {
        try{
            let query = {status: true};
            if (req.query.status !== undefined) {
                query.status = req.query.status === "false" ? false : true;
            }
            const data = await DBHelper.findAllOrFail(moduleModel,0,0, {createdAt: -1}, query);
            if(!data) {
                return ResponseHandler.error(res, "No modules found", 404);
            }
            return ResponseHandler.success(res, "modules retrieved successfully", data, "", 200);

        }
        catch(error){
            console.log(`An error occurred while getting all module: ${error}`);
            if(error instanceof Error) {
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while getting all module", 400);
        }
    }

    getModuleById = async(req, res) => {
        try{
            const { id } = req.params;
            const data = await DBHelper.findByIdOrFail(moduleModel, id);
            if(!data) {
                return ResponseHandler.error(res, "module not found", 404);
            }
            return ResponseHandler.success(res, "module found successfully", data, "", 200);
        }
        catch(error){
            console.log(`An error occurred while getting module by id: ${error}`);
            if(error instanceof Error) {
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while getting module by id", 400);
        }
    }

    softDeleteModule = async(req, res) => {
        try{
            const { id } = req.params;
            const data = await DBHelper.findByIdOrFail(moduleModel, id);

            if(!data) {
                return ResponseHandler.error(res, "module not found", 404);
            }

            const newStatus = !data.status;
            console.log('newStatus', newStatus);
            const updatedData = await DBHelper.softDelete(moduleModel,newStatus, id);
            if(!updatedData){
                return ResponseHandler.error(res, "An error occurred while soft deleting module", 400);
            }
            return ResponseHandler.success(res, "module soft deleted successfully", updatedData, "", 200);
        }
        catch(error){
            console.log(`An error occurred while soft deleting module: ${error}`);
            if(error instanceof Error) {
                return ResponseHandler.error(res, error.message, 400);
            }
            return ResponseHandler.error(res, "An error occurred while soft deleting module", 400);
        }
    }
}