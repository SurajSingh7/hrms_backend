import mongoose from "mongoose";
import connectDB from "../../config/connectDB.js";
import dotenv from 'dotenv';

dotenv.config(); 

const DB_URL = process.env.DB_URL; 

// Connect to the HRMS database
const hrmsDBConnection = await connectDB(DB_URL, 'hrmsDB');
const areaSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },  // Name of the location (e.g., Azadpur, Dwarka - Sector-7)
});

const Area = hrmsDBConnection.model('Area', areaSchema);

export default Area;
