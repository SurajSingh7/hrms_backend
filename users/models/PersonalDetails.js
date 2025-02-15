import mongoose from 'mongoose';

const { Schema } = mongoose;
import connectDB from "../../config/connectDB.js";// Adjust the path if necessary
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file


// Load your database URL from environment variables
const DB_URL = process.env.DB_URL; // Ensure you have a DB_URL in your .env file

// Connect to the HRMS database
const userDBConnection = await connectDB(DB_URL, 'userDB');
const userSchema = new Schema({
    login_id: {
        type: Schema.Types.ObjectId, // Assuming it's a reference to another document
        ref: 'Login', // Replace 'BasicEmployee' with the actual name of the referenced model
       
      },
  personalEmail: { type: String },
  remarks: { type: String },
  phone: { type: String },
  bloodGroup: { type: String },
  address1: { type: String },
  address2: { type: String },
  place: { type: String },
  city: { type: String },
  pinCode: { type: String },
 
  printCheque: { type: String },
  bankAccountNumber: { type: String },
  bankBranchCode: { type: String },
  correspondenceAddress1: { type: String },
  correspondenceAddress2: { type: String },
  correspondencePlace: { type: String },
  correspondenceCity: { type: String },
  correspondencePhone: { type: String },
  correspondencePinCode: { type: String },
  personalMobileNo: { type: String },
  officeMobileNo: { type: String },
  officeExtensionNo: { type: String },
  handicap: { type: String }
},{timestamps : true});

const User = userDBConnection.model('User', userSchema);

export default User;
