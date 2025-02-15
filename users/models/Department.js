import mongoose from "mongoose";
import connectDB from "../../config/connectDB.js";// Adjust the path if necessary
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file


// Load your database URL from environment variables
const DB_URL = process.env.DB_URL; // Ensure you have a DB_URL in your .env file

// Connect to the HRMS database
const userDBConnection = await connectDB(DB_URL, 'userDB');
const departmentSchema = new mongoose.Schema({
    name: String,
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
},{timestamps : true});
const Department = userDBConnection.model('Department', departmentSchema);

export default Department;