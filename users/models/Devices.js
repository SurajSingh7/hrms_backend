import mongoose from 'mongoose';
import crypto from 'crypto';
import connectDB from "../../config/connectDB.js";// Adjust the path if necessary
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file


// Load your database URL from environment variables
const DB_URL = process.env.DB_URL; // Ensure you have a DB_URL in your .env file

// Connect to the HRMS database
const userDBConnection = await connectDB(DB_URL, 'userDB');
// Function to generate a secure API token
const generateToken = () => {
  return crypto.randomBytes(32).toString('hex'); // Generates a 64-character hex string
};

const deviceSchema = new mongoose.Schema({
  deviceName: { type: String, required: true },
  senderPhone: { type: String, required: true },
  status: { type: String, default: 'OFFLINE' },
  apiToken: { type: String }, // Ensure this field is required
},{timestamps : true});

// Middleware to set the apiToken before saving the document
deviceSchema.pre('save', function (next) {
  if (this.isNew) {
    console.log('Generating API token');
    this.apiToken = generateToken(); // Generate a token for new documents
  }
  next();
});

const Device = userDBConnection.model('Device', deviceSchema);

export default Device;
