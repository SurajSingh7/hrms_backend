import mongoose from "mongoose";
// import dotenv from 'dotenv'
// dotenv.config();
// import userDB from '../config/connectDB.js';
// const DB_URL = process.env.DB_URL;

// userDB(DB_URL)
import connectDB from "../../config/connectDB.js";// Adjust the path if necessary
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file


// Load your database URL from environment variables
const DB_URL = process.env.DB_URL; // Ensure you have a DB_URL in your .env file

// Connect to the HRMS database
const userDBConnection = await connectDB(DB_URL, 'userDB');

const permissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    resources: { type: String }, // Add this field
    access: { type: String }, // Add this field
    menuName: {type: String},
    department:{type:String}
},{timestamps : true});

const Permission = userDBConnection.model('Permission', permissionSchema);

export default Permission;