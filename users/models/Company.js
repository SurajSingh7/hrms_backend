import mongoose from 'mongoose';
import connectDB from "../../config/connectDB.js";// Adjust the path if necessary
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file


// Load your database URL from environment variables
const DB_URL = process.env.DB_URL; // Ensure you have a DB_URL in your .env file

// Connect to the HRMS database
const userDBConnection = await connectDB(DB_URL, 'userDB');
const companyRegistrationSchema = new mongoose.Schema({
  gstin: { type: String },
  selectedCompany: { type: String },
  clientType: { type: String },
  personName: { type: String },
  email: { type: String },
  mobile: { type: String },
  license: { type: String },
  business: {
    business_name: { type: String },
    legal_name: { type: String },
    pan_number: { type: String },
    date_of_registration: { type: Date },
    constitution_of_business: { type: String },
    taxpayer_type: { type: String },
    gstin_status: { type: String },
    address: { type: String },
    center_jurisdiction: { type: String },
    state_jurisdiction: { type: String },
    nature_bus_activities: { type: [String] },
    nature_of_core_business_activity_description: { type: String },
    aadhaar_validation: { type: String },
    aadhaar_validation_date: { type: Date },
    einvoice_status: { type: Boolean },
    address_details: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postal_code: { type: String },
    },
  },
},{timestamps : true});

const Business = userDBConnection.model('CompanyRegistration', companyRegistrationSchema);

export default Business;
