import Employee from '../models/Employee.js';
import Login from '../models/Login.js';

let formData = {};
export const createEmployee = async (req, res) => {
    formData.step2 = req.body;
    res.status(200).send('Step 2 data stored');
};

// Get all employees
export const getAllEmployees = async (req, res) => {

    try {
    const employees = await Login.aggregate([
        {
          $lookup: {
            from: 'basicemployees',
            localField: '_id',
            foreignField: 'login_id',
            as: 'basicemployees',
          },
        },
        {
          $lookup: {
            from: 'employees',
            localField: '_id',
            foreignField: 'login_id',
            as: 'employees',
          },
        },
        {
          $lookup: {
            from: 'financialdetails',
            localField: '_id',
            foreignField: 'login_id',
            as: 'financialdetails',
          },
        },
        {
            $lookup: {
              from: 'users',
              localField: '_id',
              foreignField: 'login_id',
              as: 'users',
            },
          },
          
      ]).sort({createdAt : -1});
  
      
          res.status(200).send(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get employee by ID
export const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findOne({ login_id: req.params.id }).exec();
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update employee by ID
export const updateEmployeeById = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findOneAndUpdate({ login_id: req.params.id }, req.body, { new: true });
        
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete employee by ID
export const deleteEmployeeById = async (req, res) => {
    try {
        const deletedEmployee = await BasicEmployee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFormData = () => formData;