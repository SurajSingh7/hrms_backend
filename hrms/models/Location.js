import mongoose from "mongoose";
import connectDB from "../../config/connectDB.js";
import dotenv from 'dotenv';

dotenv.config(); 
const DB_URL = process.env.DB_URL; 


const hrmsDBConnection = await connectDB(DB_URL, 'hrmsDB');
const locationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },  
});

const Location = hrmsDBConnection.model('Location', locationSchema);

export default Location;
