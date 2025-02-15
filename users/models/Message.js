import mongoose from 'mongoose';
import connectDB from "../../config/connectDB.js";// Adjust the path if necessary
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file


// Load your database URL from environment variables
const DB_URL = process.env.DB_URL; // Ensure you have a DB_URL in your .env file

// Connect to the HRMS database
const userDBConnection = await connectDB(DB_URL, 'userDB');

const circularMessageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  department: { type: String, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
},{timestamps : true});

const Message = userDBConnection.model('Message', circularMessageSchema);

export default Message;
