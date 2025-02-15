// controllers/employeeController.js
import Employee from '../models/Employee.js';
import Login from '../models/Login.js';

let formData = {};
// Create a new employee
export const createEmployee = async (req, res) => {
    formData.step2 = req.body;
  //  let data = new Employee(req.body);
  //  await data.save();
    //console.log(formData)
    // try {
    //     const newEmployee = await Employee.create(req.body);
    //     res.status(201).json(newEmployee);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }
    res.status(200).send('Step 2 data stored');
};

// Get all employees
export const getAllEmployees = async (req, res) => {

    try {
      //  const employees = await Employee.find();
    //   const employees = await Login.find({}).populate({
    //     path:'basicemployees',
    //     select:''
    //   })
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
        // const employee = await Employee.findById(req.params.id);
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
        // const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

