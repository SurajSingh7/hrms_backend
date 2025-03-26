import mongoose from "mongoose";
import dotenv from 'dotenv';
import connectDB from "../../config/connectDB.js";
import createPermissionModel from './PermissionModel.js';
dotenv.config(); // Load environment variables from .env file

// Load your database URL from environment variables
const DB_URL = process.env.DB_URL; // Ensure you have a DB_URL in your .env file

// Connect to the HRMS database
const userDBConnection = await connectDB(DB_URL, 'userDB');


const Permission = createPermissionModel(userDBConnection);
// Define and register the Role schema/model
const roleSchema = new mongoose.Schema({
    name: String,
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }]
},{timestamps : true});

const Role = userDBConnection.model('Role', roleSchema);

export default Role;
