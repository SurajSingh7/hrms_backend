import Company from "../models/company-model.js";

export default class CompanyController {
    constructor(){

    }
    createCompany = async (req, res) => {
        const { companyName, address, gstNumber, state, alias } = req.body;
        try {
            let company = new Company({
                companyName,
                address,
                gstNumber,
                state,
                alias
            });
            await company.save();
            return res.status(201).send({ success: true, message: "Company Created Successfully" });
        } catch (error) {
            console.log('Error while creating company', error);
            return res.status(500).send({ success: false, message: "Something went wrong" });
        }
    };
    
    getCompany = async (req, res) => {
        try {
            let query = { status: true }; 

            if (req.query.companyName) {
                query.companyName = req.query.companyName; 
            }

            if (req.query.status !== undefined) {
                query.status = req.query.status === "false" ? false : true;
            }

            const result = await Company.find(query);
            if (!result || result.length === 0) {
                return res.status(404).send({ success: false, message: "Data Not Found" });
            }
            return res.status(200).send({ success: true, data: result });
        } catch (error) {
            console.log('Error occurred while getting all company', error)
            return res.status(500).send({ success:false,message: error.message });
        }
    };
    
    editCompany = async (req, res, next) => {
        const { companyId } = req.params;
        const { companyName, address, gstNumber, state, alias } = req.body;
    
        try {
            const updatedCompany = await Company.findByIdAndUpdate(
                companyId,
                { companyName, address, gstNumber, state, alias },
                { new: true, runValidators: true }
            );
    
            if (!updatedCompany) {
                return res.status(404).send({ success: false, message: "Company Not Found" });
            }
    
            return res.status(200).send({success: true, message: "Company Updated Successfully", data: updatedCompany });
        } catch (error) {
            console.log('Error occurred while updating company', error)
            return res.status(500).send({ success: false, message: error.message });
        }
    };
    
    deleteCompany = async (req, res) => {
        const { companyId } = req.params;
    
        try {
            const company = await Company.findById(companyId);
            if (!company) {
                return res.status(404).send({ success: false, message: "Company Not Found" });
            }
    
            // Toggle the status (true → false, false → true)
            const newStatus = !company.status;
    
            await Company.findByIdAndUpdate(companyId, { status: newStatus });
    
            return res.status(200).send({
                success: true,
                message: `Company ${newStatus ? "Activated" : "Deactivated"} Successfully`,
                status: newStatus
            });
    
        } catch (error) {
            console.error('Error occurred while toggling company status', error);
            return res.status(500).send({ success: false, message: error.message });
        }
    };    
}