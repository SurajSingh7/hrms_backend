// models/Task.js
import {mongoose, Schema} from 'mongoose';
import connectDB from "../../config/connectDB.js";// Adjust the path if necessary
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file


// Load your database URL from environment variables
const DB_URL = process.env.DB_URL; // Ensure you have a DB_URL in your .env file

// Connect to the HRMS database
const userDBConnection = await connectDB(DB_URL, 'userDB');
const taskSchema = new mongoose.Schema({
    login_id: {
        type: Schema.Types.ObjectId, // Assuming it's a reference to another document
        ref: 'Login', // Replace 'BasicEmployee' with the actual name of the referenced model
      
      },
  priority: Number,
  selectManager: String,
  viewOnly: String,
  approvalMust: String,
  approvedCancelRights: String,
  checkboxOptions: [String]
},{timestamps : true});

const ApprovalMatrix = userDBConnection.model('Request', taskSchema);

export default ApprovalMatrix;
