import mongoose from 'mongoose';

// import dotenv from 'dotenv'
// dotenv.config();
// import userDB from '../config/connectDB.js';
// const DB_URL = process.env.DB_URL;
const { Schema } = mongoose;
//userDB(DB_URL)
import connectDB from "../../config/connectDB.js";// Adjust the path if necessary
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file


// Load your database URL from environment variables
const DB_URL = process.env.DB_URL; // Ensure you have a DB_URL in your .env file

// Connect to the HRMS database
const userDBConnection = await connectDB(DB_URL, 'userDB');
const uploadFileInfoSchema = new mongoose.Schema({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number
});


const avatarSchema = new mongoose.Schema({
  file: {
      type: Object, // For storing a file as an object
      required: true
  },
  fileList: {
      type: [Object], // For storing an array of files or file metadata
      required: true
  }
});



const employeeSchema = new Schema({
    login_id: {
        type: Schema.Types.ObjectId, // Assuming it's a reference to another document
        ref: 'Login', // Replace 'BasicEmployee' with the actual name of the referenced model
       
      },
  employeeCode: {
    type: String,
  //  unique: true,
  //   required: [true, "Please Select Your Employee Code"],
    trim: true
  },
  companyName:{
	  type:String,
  },
  firstName: {
    type: String,
    
  },
  middleName: {
    type: String
  },
  lastName: {
    type: String,
    
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  category: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  dateOfJoining: {
    type: Date
  },
  esiLocation: {
    type: String
  },
  esiDispensary: {
    type: String
  },
  biometricMachineLocation: {
    type: String
  },
  profTaxLocation: {
    type: String
  },
//   username: {
//     type: String,
//     unique: true
//   },
//   password: {
//     type: String
//   },
  esslName: {
    type: String
  },
   avatar: {
    type: avatarSchema, // Embedding the avatar schema
},
  profileImage:{
   type: String
  },
  uploadFileInfo: [uploadFileInfoSchema],
  metroOrNonMetro: {
    type: String,
    enum: ['Metro', 'Non-Metro']
  }
}, { timestamps: true });

const BasicEmployee = userDBConnection.model('BasicEmployee', employeeSchema);

export default BasicEmployee;
