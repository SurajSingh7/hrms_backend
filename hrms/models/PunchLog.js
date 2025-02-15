import mongoose from "mongoose";
import connectDB from "../../config/connectDB.js";
import dotenv from 'dotenv';

dotenv.config(); 

const DB_URL = process.env.DB_URL; 

// Connect to the HRMS database
const hrmsDBConnection = await connectDB(DB_URL, 'hrmsDB');
const punchLogSchema = new mongoose.Schema({
    EmployeeCode: String,
    EmployeeName: String,
    InTime: String,
    OutTime: String,
    PunchRecords: String,
    Status: String,
    P1Status: String,
    P2Status: String,
    P3Status: String,
    MissedInPunch: String,
    BeginTime: String,
    EndTime: String
    //
  });
  punchLogSchema.post('save', function (doc, next) {
    // Define the email options
    //const data = this
    console.log('User saved:', doc);    
    });
  const PunchLog = hrmsDBConnection.model('PunchLog',punchLogSchema);
 export default PunchLog;