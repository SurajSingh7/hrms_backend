//Login Model

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from 'crypto';

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

const userSchema = new mongoose.Schema({
  username: { type: String,  },
  password: { type: String,  },
  confirmPassword: { type: String,  },
  email: { type: String,  },
  department: {
    type: Schema.Types.ObjectId, // Assuming it's a reference to another document
    ref: 'Department', // Replace 'BasicEmployee' with the actual name of the referenced model
   
  },
  role: {
    type: Schema.Types.ObjectId, // Assuming it's a reference to another document
    ref: 'Role', // Replace 'BasicEmployee' with the actual name of the referenced model
   
  },
  isMfaActive : {
    type: Boolean,
    default: false
  },
  twoFactorSecret:{
    type : String
  },
  passwordChangedAt:Date,
  passwordResetToken:String,
  paswordResetTokenExpires:Date

},{timestamps : true});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  //password encryption
  this.password = await bcrypt.hash(this.password, 10);

  this.confirmPassword = undefined;
  next();

});
userSchema.methods.createResetPasswordToken = function ()  {
  const resetToken = crypto.randomBytes(32).toString('hex')
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.paswordResetTokenExpires = Date.now() + 10 * 60 * 1000
  console.log(resetToken,this.passwordResetToken)
  return resetToken;
}
const Login = userDBConnection.model('Login', userSchema);

export default Login;
