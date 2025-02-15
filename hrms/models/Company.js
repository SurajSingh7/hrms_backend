import mongoose from "mongoose";
import connectDB from "../../config/connectDB.js";// Adjust the path if necessary
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const DB_URL = process.env.DB_URL; 

// Connect to the HRMS database
const hrmsDBConnection = await connectDB(DB_URL, 'hrmsDB');
const companySchema = new mongoose.Schema({
    companyName: { 
    type: String, 
    required: true,
     unique: true 
    }, 
    address: { 
        type: String, 
        required: true,
        },
    gstNumber:{
        type: String, 
        required: true,
         unique: true
    },
    state:{
        type: String, 
        required: true,
         unique: true
    },
    alias:{
        type: String, 
        required: true,
    }
});

const Company = hrmsDBConnection.model('company', companySchema);

export default Company;
