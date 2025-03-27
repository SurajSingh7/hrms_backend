// controllers/personalDetailsController.js
import PersonalDetails from '../models/PersonalDetails.js';

let formData = {};
// Create new personal details entry
export const createPersonalDetails = async (req, res) => {
    formData.step3 = req.body;
   console.log(formData)

    // try {
    //     const newPersonalDetails = await PersonalDetails.create(req.body);
    //     res.status(201).json(newPersonalDetails);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
    res.status(200).send('Step 3 data stored');
};

// Get all personal details
export const getAllPersonalDetails = async (req, res) => {
    try {
        const personalDetails = await PersonalDetails.find();
        res.status(200).json(personalDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get personal details by ID
export const getPersonalDetailsById = async (req, res) => {
    try {
        // const personalDetails = await PersonalDetails.findById(req.params.id);
        const personalDetails = await PersonalDetails.findOne({ login_id: req.params.id }).exec();

        if (!personalDetails) {
            return res.status(404).json({ message: 'Personal details not found' });
        }
        res.status(200).json(personalDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update personal details by ID
export const updatePersonalDetailsById = async (req, res) => {
    try {
        // const updatedPersonalDetails = await PersonalDetails.findByIdAndUpdate(req.params.id, req.body, { new: true });
        const updatedPersonalDetails = await PersonalDetails.findOneAndUpdate({ login_id: req.params.id }, req.body, { new: true });

        if (!updatedPersonalDetails) {
            return res.status(404).json({ message: 'Personal details not found' });
        }
        res.status(200).json(updatedPersonalDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete personal details by ID
export const deletePersonalDetailsById = async (req, res) => {
    try {
        const deletedPersonalDetails = await PersonalDetails.findByIdAndDelete(req.params.id);
        if (!deletedPersonalDetails) {
            return res.status(404).json({ message: 'Personal details not found' });
        }
        res.status(200).json({ message: 'Personal details deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getFormData = () => formData;
