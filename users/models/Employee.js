import mongoose from 'mongoose';

const { Schema } = mongoose;
import connectDB from "../../config/connectDB.js";// Adjust the path if necessary
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file


// Load your database URL from environment variables
const DB_URL = process.env.DB_URL; // Ensure you have a DB_URL in your .env file

// Connect to the HRMS database
const userDBConnection = await connectDB(DB_URL, 'userDB');
const employeeSchema = new Schema({
  login_id: {
    type: Schema.Types.ObjectId, // Assuming it's a reference to another document
    ref: 'Login', // Replace 'BasicEmployee' with the actual name of the referenced model
   
  },
  fatherName: String,
//   department: String,
  designation: String,
  maritalStatus: String,
  confirmationPeriod: String,
  confirmationDate: String,
  dateOfAnniversary: String,
  retirementAge: String,
  dateOfRetirement: String,
  pfAccountNo: String,
  esiNo: String,
  grade: String,
  noOfChildren: Number,
  costCentre: String,
  branch: String,
  uanNumber: String,
  panGirNo: String,
  empPf: String,
  pensionFund: String,
  stopPayment: String,
  pfDateOfJoining: String,
  terminationDate: String,
  bankName: String,
  location: String,
  payMode: String,
  seniorCitizen: String,
  payrollProcess: String,
  itaxRegimeType: String,
  reportingManager: String,
  esicDateOfJoining: String
}, {
  timestamps: true
});

const Employee = userDBConnection.model('Employee', employeeSchema);

export default Employee;
