import mongoose from 'mongoose';
import connectDB from "../../config/connectDB.js";// Adjust the path if necessary
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file


// Load your database URL from environment variables
const DB_URL = process.env.DB_URL; // Ensure you have a DB_URL in your .env file

// Connect to the HRMS database
const userDBConnection = await connectDB(DB_URL, 'userDB');
const { Schema } = mongoose;

const userSchema = new Schema({

  login_id: {
        type: Schema.Types.ObjectId, // Assuming it's a reference to another document
        ref: 'Login', // Replace 'BasicEmployee' with the actual name of the referenced model
       
    },
  shiftTime: { type: String },
  weaklyOff: { type: String },
},{timestamps : true});

const Shift = userDBConnection.model('Shift', userSchema);

export default Shift;
















// import mongoose from 'mongoose';
// import connectDB from "../../config/connectDB.js";// Adjust the path if necessary
// import dotenv from 'dotenv';

// dotenv.config(); // Load environment variables from .env file


// // Load your database URL from environment variables
// const DB_URL = process.env.DB_URL; // Ensure you have a DB_URL in your .env file

// // Connect to the HRMS database
// const userDBConnection = await connectDB(DB_URL, 'userDB');
// const { Schema } = mongoose;

// const userSchema = new Schema({

//   login_id: {
//         type: Schema.Types.ObjectId, // Assuming it's a reference to another document
//         ref: 'Login', // Replace 'BasicEmployee' with the actual name of the referenced model
       
//     },

//   // Permanent Scheduler
//   permanentScheduler: {
//     shiftName: { type: String },
//     dateRange: {
//       startDate: { type: Date },
//       endDate: { type: Date }
//     }
//   },
  
//   // Temporary Scheduler
//   temporaryScheduler: {
//     enabled: { type: Boolean, default: false },
//     shiftName: { type: String },
//     dateRange: {
//       startDate: { type: Date },
//       endDate: { type: Date }
//     }
//   },
//   // Employee Enroll Mapping
//   employeeEnrollMapping: {
//     delhiOffice: { type: String },
//     tdiLocation: { type: String },
//     sonipat: { type: String },
//     opJindal: { type: String },
//     omax: { type: String },
//     metroView: { type: String },
//     gispl: { type: String }
//   },
//   // Week Off
//   weekOff: {
//     sunday: { type: Boolean, default: false },
//     sundayHalfDay: { type: Boolean, default: false },
//     monday: { type: Boolean, default: false },
//     mondayHalfDay: { type: Boolean, default: false },
//     tuesday: { type: Boolean, default: false },
//     tuesdayHalfDay: { type: Boolean, default: false },
//     wednesday: { type: Boolean, default: false },
//     wednesdayHalfDay: { type: Boolean, default: false },
//     thursday: { type: Boolean, default: false },
//     thursdayHalfDay: { type: Boolean, default: false },
//     friday: { type: Boolean, default: false },
//     fridayHalfDay: { type: Boolean, default: false },
//     saturday: { type: Boolean, default: false },
//     saturdayHalfDay: { type: Boolean, default: false }
//   }
// });

// const Shift = userDBConnection.model('Shift', userSchema);

// export default Shift;
