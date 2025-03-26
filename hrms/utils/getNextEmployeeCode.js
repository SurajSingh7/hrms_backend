import PunchLog from "../models/PunchLog.js";
const getNextEmployeeCode = async (prefix) => {
    // Fetch the latest employee code starting with the provided prefix (WIBRO or GTEL)
    const lastEmployee = await PunchLog.findOne({ EmployeeCode: { $regex: `^${prefix}` } })
      .sort({ EmployeeCode: -1 })  // Sort by employeeCode descending
      .exec();
//   const lastEmployee = {
//     employeeCode:"WIBRO0009"
//   }
  if (lastEmployee) {
    const lastCode = lastEmployee.EmployeeCode;
    const numberPart = parseInt(lastCode.replace(prefix, ''), 10);
    const strLength = lastCode.replace(prefix, '').length;
    const nextNumber = numberPart + 1;
    return `${prefix}${nextNumber.toString().padStart(strLength, '0')}`; 
  } else {
    return `${prefix}00001`;
  }
  };

  export default getNextEmployeeCode;

