// controllers/financialDetailController.js
import FinancialDetail from '../models/FinancialDetail.js';


let formData = {};
// Create a new financial detail entry
export const createFinancialDetail = async (req, res) => {
 formData.step4 = req.body;
    // try {
    //     const newFinancialDetail = await FinancialDetail.create(req.body);
    //     res.status(201).json(newFinancialDetail);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
    res.status(200).send('Step 4 data stored');
};

// Get all financial details
export const getAllFinancialDetails = async (req, res) => {
    try {
        const financialDetails = await FinancialDetail.find();
        res.status(200).json(financialDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get financial detail by ID
export const getFinancialDetailById = async (req, res) => {
    try {
        // const financialDetail = await FinancialDetail.findById(req.params.id);
        const financialDetail = await FinancialDetail.findOne({ login_id: req.params.id }).exec();


        if (!financialDetail) {
            return res.status(404).json({ message: 'Financial detail not found' });
        }
        res.status(200).json(financialDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update financial detail by ID
export const updateFinancialDetailById = async (req, res) => {
    try {
        // const updatedFinancialDetail = await FinancialDetail.findByIdAndUpdate(req.params.id, req.body, { new: true });
        const updatedFinancialDetail = await  FinancialDetail.findOneAndUpdate({ login_id: req.params.id }, req.body, { new: true });

        if (!updatedFinancialDetail) {
            return res.status(404).json({ message: 'Financial detail not found' });
        }
        res.status(200).json(updatedFinancialDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete financial detail by ID
export const deleteFinancialDetailById = async (req, res) => {
    try {
        const deletedFinancialDetail = await FinancialDetail.findByIdAndDelete(req.params.id);
        if (!deletedFinancialDetail) {
            return res.status(404).json({ message: 'Financial detail not found' });
        }
        res.status(200).json({ message: 'Financial detail deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getFormData = () => formData;