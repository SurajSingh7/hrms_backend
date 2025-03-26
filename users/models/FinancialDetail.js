import mongoose from 'mongoose';

const { Schema } = mongoose;
import connectDB from "../../config/connectDB.js";// Adjust the path if necessary
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file


// Load your database URL from environment variables
const DB_URL = process.env.DB_URL; // Ensure you have a DB_URL in your .env file

// Connect to the HRMS database
const userDBConnection = await connectDB(DB_URL, 'userDB');
const financialDetailsSchema = new Schema({
    login_id: {
        type: Schema.Types.ObjectId, // Assuming it's a reference to another document
        ref: 'Login', // Replace 'BasicEmployee' with the actual name of the referenced model
       
      },
  fixedBasic: {
    type: Number,
    required: false,
  },
  arrearBasic: {
    type: Number,
    required: false,
  },
  earningsTotal: {
    type: Number,
    required: false,
  },
  incomeTax: {
    type: Number,
    required: false,
  },
  deductionsTotal: {
    type: Number,
    required: false,
  },
  personalDetails_id:{
    type: Number,
    required: false,
  },
}, { timestamps: true });

const FinancialDetail = userDBConnection.model('FinancialDetail', financialDetailsSchema);

export default FinancialDetail;
