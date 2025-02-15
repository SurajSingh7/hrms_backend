import Company from "../models/Company.js";

const createCompany = async (req, res, next) => {
    console.log(req.body);
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
        res.status(201).send({ error: false, message: "Company Created Successfully" });
    } catch (error) {
        res.status(500).send({ error: true, message: "Something went wrong" });
    }
};

const getCompany = async (req, res, next) => {
    try {
        const result = await Company.find();
        if (!result || result.length === 0) {
            return res.status(404).send({ error: true, message: "Data Not Found" });
        }
        res.status(200).send({ error: false, data: result });
    } catch (error) {
        res.status(500).send({ error: true, message: "Something went wrong" });
    }
};

// ✅ Edit Company (Update)
const editCompany = async (req, res, next) => {
    const { companyId } = req.params;
    const { companyName, address, gstNumber, state, alias } = req.body;

    try {
        const updatedCompany = await Company.findByIdAndUpdate(
            companyId,
            { companyName, address, gstNumber, state, alias },
            { new: true, runValidators: true }
        );

        if (!updatedCompany) {
            return res.status(404).send({ error: true, message: "Company Not Found" });
        }

        res.status(200).send({ error: false, message: "Company Updated Successfully", data: updatedCompany });
    } catch (error) {
        res.status(500).send({ error: true, message: "Something went wrong" });
    }
};

// ✅ Delete Company
const deleteCompany = async (req, res, next) => {
    const { companyId } = req.params;

    try {
        const deletedCompany = await Company.findByIdAndDelete(companyId);
        if (!deletedCompany) {
            return res.status(404).send({ error: true, message: "Company Not Found" });
        }

        res.status(200).send({ error: false, message: "Company Deleted Successfully" });
    } catch (error) {
        res.status(500).send({ error: true, message: "Something went wrong" });
    }
};

export { createCompany, getCompany, editCompany, deleteCompany };





// import Company from "../models/Company.js";

// const createCompany = async (req,res,next) => {
//     console.log(req.body)
//     const {companyName,address,gstNumber,state,alias} = req.body;
//     try {
//         let company = new Company({
//             companyName:companyName,
//             address:address,
//             gstNumber:gstNumber,
//             state:state,
//             alias:alias
//         })
//         const data = await company.save()
//         res.status(201).send({"error":false,"message":"Company Created Successfully"})
        
//     } catch (error) {
//         res.send({"error":true,"message":"something went wrong"});
//     }
// }

// const getCompany = async (req,res,next) => {
//     const result = await Company.find()
//     if(!result) {
//         //const error = new CustomError("Department Not Found",404);
//         res.status(404).send({"error":true,"message":"Data Not Found"});
//     }
//     res.status(200).send({"error":false,"data":result});
// }
// export {createCompany,getCompany}