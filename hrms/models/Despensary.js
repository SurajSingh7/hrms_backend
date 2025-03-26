import mongoose from "mongoose";
import connectDB from "../../config/connectDB.js";
import dotenv from 'dotenv';

dotenv.config(); 


// Load your database URL from environment variables
const DB_URL = process.env.DB_URL; 

// Connect to the HRMS database
const hrmsDBConnection = await connectDB(DB_URL, 'hrmsDB');
const dispensarySchema = new mongoose.Schema({
    name: { type: String, required: true },  // Name of the dispensary
    address: { type: String, required: true },  // Full address of the dispensary
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },  
  });
  
  const Dispensary = hrmsDBConnection.model('Dispensary', dispensarySchema);
  export default Dispensary;