import BasicEmployee from '../models/BasicEmployee.js';
import PersonalDetails from '../models/PersonalDetails.js';

// Controller functions

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await BasicEmployee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get employee by employeeCode and populate from PersonalDetails using login_id
// Get employee by employeeCode and return specific fields from PersonalDetails and Employee
const getEmployeeByCode = async (req, res) => {
  try {
    const { employeeCode } = req.params;  // Get employeeCode from route parameter

    // Fetch the employee based on employeeCode
    const employee = await BasicEmployee.findOne({ employeeCode }).select("login_id");
    console.log('employee', employee);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Fetch the related PersonalDetails using login_id from the employee
    const personalDetails = await PersonalDetails.findOne({ login_id: employee.login_id }).select("phone");

    if (!personalDetails) {
      return res.status(404).json({ message: "PersonalDetails not found" });
    }

    // Extract the phone number from personalDetails
    // const { phone } = personalDetails;

    // Extract only the required fields from the employee object
    // const employeeData = {
    //   _id: employee._id,
    //   employeeCode: employee.employeeCode,
    //   companyName: employee.companyName,
    //   firstName: employee.firstName,
    //   // Add any other fields you want to include from the employee object here
    // };

    // Return the filtered response with employee and phone number from personalDetails
    res.status(200).json({
      employee: personalDetails,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






// Get employee by ID
const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    // const employee = await BasicEmployee.findById(id);
    const employee = await BasicEmployee.findOne({ login_id: req.params.id }).exec();
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 

let formData = {};
// Create a new employee
const createEmployee = async (req, res) => {
  const {employeeCode,companyName,firstName,middleName,lastName,gender,category,dob,dateOfJoining,location,dispensaryName,biometricMachineLocation,profTaxLocation,metroOrNonMetro,avatar,uploadFileInfo,employeeName} = req.body

   formData.step1 = {
    employeeCode,
	  companyName,
    firstName,
    middleName,
    lastName,
    gender,
    category,
    dob,
    dateOfJoining,
    location,
    dispensaryName,
    biometricMachineLocation,
    profTaxLocation,
    metroOrNonMetro,
    //avatar:avatar.fileList[0].originFileObj.uid+'-'+avatar.fileList[0].name,
    // avatar:JSON.parse(avatar),
    // uploadFileInfo:JSON.parse(uploadFileInfo),

    // avatar:JSON.parse(avatar),
    // uploadFileInfo:uploadFileInfo,


    employeeName
   }

   console.log(uploadFileInfo,"uploadinfo") 
   // Check if avatar is an object and has a fileList array
// if (avatar && avatar.fileList && avatar.fileList.length > 0) {
//   const file = avatar.fileList[0].originFileObj; // Extract the file object

//   // Add the uid to the avatar object
//   formData.step1.avatar = {
//     uid: file.uid // Add the uid to the avatar object
//   };
// }
    console.log('form data from basic employee controller >>>>>',formData)
    
    //   const {
//     employeeCode,
//     firstName,
//     middleName,
//     lastName,
//     gender,yy
//     category,
//     dateOfBirth,
//     dateOfJoining,
//     esiLocation,
//     esiDispensary,
//     biometricMachineLocation,
//     profTaxLocation,
//     username,
//     password,
//     esslName,
//     avatar,
//     metroOrNonMetro,
//     login_id
//   } = req.body;

//   const newEmployee = new BasicEmployee({
//     employeeCode,
//     firstName,
//     middleName,
//     lastName,
//     gender,
//     category,
//     dateOfBirth,
//     dateOfJoining,
//     esiLocation,
//     esiDispensary,
//     biometricMachineLocation,
//     profTaxLocation,
//     username,
//     password,
//     esslName,
//     avatar,
//     metroOrNonMetro,
//     login_id
//   });

//   try {
//     const savedEmployee = await newEmployee.save();
//     res.status(201).json(savedEmployee);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
return res.status(200).send('Step 1 data stored');
};
// Update an employee
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const {
    employeeCode,
    firstName,
    middleName,
    lastName,
    gender,
    category,
    dateOfBirth,
    dateOfJoining,
    esiLocation,
    esiDispensary,
    biometricMachineLocation,
    profTaxLocation,
    username,
    password,
    esslName,
    avatar,
    metroOrNonMetro,
    login_id
  } = req.body;

  try {
    // const updatedEmployee = await Employee.findOneAndUpdate({ login_id: req.params.id }
      
    //   , req.body, { new: true });
      
    const updatedEmployee = await BasicEmployee.findOneAndUpdate({ login_id: req.params.id }, {
      employeeCode,
      firstName,
      middleName,
      lastName,
      gender,
      category,
      dateOfBirth,
      dateOfJoining,
      esiLocation,
      esiDispensary,
      biometricMachineLocation,
      profTaxLocation,
      username,
      password,
      esslName,
      avatar,
      metroOrNonMetro,
      login_id
    }, { new: true });

    if (!updatedEmployee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await BasicEmployee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFormData = () => formData;

export {
  getAllEmployees,
  getEmployeeById,
 createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeByCode
};
