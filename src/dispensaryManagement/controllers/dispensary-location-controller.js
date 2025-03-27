import ResponseHandler from "../../../utils/response-handler.js";
import DBHelper from "../../../utils/db-helper.js";
import DispensaryLocation from "../models/dispensary-location-model.js";
import PaginationHandler from "../../../utils/pagination-handler.js";

export default class DispensaryLocationController {
   
    createDispensary = async (req, res) => {
        try {
            const { name, address, phone, location } = req.body;
            const createData = await DBHelper.create(DispensaryLocation, { name, address, phone,location });

            if (!createData) {
                return ResponseHandler.error(res, "Failed to create dispensary location", 400);
            }
            return ResponseHandler.success(res, "Dispensary location created successfully", createData, '', 201);
        } catch (error) {
            console.error('Error creating dispensary:', error);
            return ResponseHandler.error(res, error.message || "Internal Server Error", 500);
        }
    };

    updateDispensary = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, address, phone, location } = req.body;
            const updateData = await DBHelper.update(DispensaryLocation, id, { name, address, phone });

            if (!updateData) {
                return ResponseHandler.error(res, "Failed to update dispensary location", 400);
            }
            return ResponseHandler.success(res, "Dispensary location updated successfully", updateData, '', 200);
        } catch (error) {
            console.error('Error updating dispensary:', error);
            return ResponseHandler.error(res, error.message || "Internal Server Error", 500);
        }
    };

    getDispensary = async (req, res) => {
        try {
            const { page, limit, skip } = PaginationHandler.paginate(req);
            let query = {status: true};

            if (req.query.name) {
                query.name = req.query.name;
            }
            if(req.query.location){
                query.location = req.query.location;
            }

            if (req.query.status !== undefined) {
                query.status = req.query.status === "false" ? false : true;
            }

            const data = await DBHelper.findAllOrFail(DispensaryLocation, skip, limit, { createdAt: -1 }, query);
            const totalRecords = await DispensaryLocation.countDocuments();

            if (!data) {
                return ResponseHandler.error(res, "No dispensary locations found", 404);
            }

            const pagination = PaginationHandler.paginateReturn(page, limit, totalRecords, data.length);

            return ResponseHandler.success(res, "Dispensary locations retrieved successfully", data, pagination, 200);
        } catch (error) {
            console.error('Error fetching dispensary locations:', error);
            return ResponseHandler.error(res, error.message || "Internal Server Error", 500);
        }
    };

    deleteDispensary = async (req, res) => {
        try {
            const { id } = req.params;
            const getData = await DBHelper.findByIdOrFail(DispensaryLocation, id);
            if (!getData) {
                return ResponseHandler.error(res, "Dispensary location not found", 404);
            }
            const newStatus = !getData.status

            const deleteData = await DBHelper.softDelete(DispensaryLocation,newStatus, id);
            if (!deleteData) {
                return ResponseHandler.error(res, "Data not found for deletion", 400);
            }
            return ResponseHandler.success(res, "Dispensary location deleted successfully", deleteData, '', 200);
        } catch (error) {
            console.error('Error deleting dispensary:', error);
            return ResponseHandler.error(res, error.message || "Internal Server Error", 500);
        }
    };

    getDispensaryById = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await DBHelper.findByIdOrFail(DispensaryLocation, id);
            if (!data) {
                return ResponseHandler.error(res, "Dispensary location not found", 404);
            }
            return ResponseHandler.success(res, "Dispensary location retrieved successfully",'', '', 200);
        } catch (error) {
            console.error('Error fetching dispensary by ID:', error);
            return ResponseHandler.error(res, error.message || "Internal Server Error", 500);
        }
    };
}