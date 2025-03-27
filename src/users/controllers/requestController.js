// controllers/requestController.js
import Request from '../models/ApprovalMatrix.js';


let formData = {};
// Create a new request
export const createRequest = async (req, res) => {
    formData.step5 = req.body;
    console.log('step 5 data', req.body);
    // try {
    //     const newRequest = await Request.create(req.body);
    //     res.status(201).json(newRequest);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
    return res.status(200).send('Step 5 data stored');
};

// Get all requests
export const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get request by ID
export const getRequestById = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update request by ID
export const updateRequestById = async (req, res) => {
    try {
        const updatedRequest = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json(updatedRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete request by ID
export const deleteRequestById = async (req, res) => {
    try {
        const deletedRequest = await Request.findByIdAndDelete(req.params.id);
        if (!deletedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFormData = () => formData;