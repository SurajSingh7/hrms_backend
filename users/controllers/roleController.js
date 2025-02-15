// controllers/roleController.js
import Role from '../models/Role.js';



let formData = {};
// Create a new role
export const createRole = async (req, res) => {
formData.step7 = req.body;
    // try {
    //     const newRole = await Role.create(req.body);
    //     res.status(201).json(newRole);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
    console.log(formData)
    res.status(200).send('Step 7 data stored');
};

// Get all roles
export const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get role by ID
export const getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update role by ID
export const updateRoleById = async (req, res) => {
    try {
        const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete role by ID
export const deleteRoleById = async (req, res) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.id);
        if (!deletedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getFormData = () => formData;
