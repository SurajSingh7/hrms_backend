import mongoose from 'mongoose';
const { Schema } = mongoose;
import connectDB from "../../config/connectDB.js";
import dotenv from 'dotenv';

dotenv.config(); 
const DB_URL = process.env.DB_URL; 

const userDBConnection = await connectDB(DB_URL, 'userDB');


const DocumentSchema = new mongoose.Schema({

    login_id: {
    type: Schema.Types.ObjectId, // Assuming it's a reference to another document
    ref: 'Login', // Replace 'BasicEmployee' with the actual name of the referenced model

    },  
  photo: { type: String },
  panCard: { type: String },
  adharCard: { type: String },
  voterId: { type: String },
  familyCard1: { type: String },
  familyCard2: { type: String },
  familyCard3: { type: String },
  cancelCheque: { type: String },
  employmentHistory1: { type: String },
  employmentHistory2: { type: String },
  employmentHistory3: { type: String },
  tenthMarksheetResult: { type: String },
  tenthMarksheetDegree: { type: String },
  twelfthMarksheetResult: { type: String },
  twelfthMarksheetDegree: { type: String },
  diploma: { type: String },
  graduationResult: { type: String },
  graduationDegree: { type: String },
  postGraduationResult: { type: String },
  postGraduationDegree: { type: String },
  other: { type: String },
}, { timestamps: true });

 const Document= userDBConnection.model('Document', DocumentSchema);
 export default Document;





// const financialDetailsSchema = new Schema({
    //     login_id: {
    //         type: Schema.Types.ObjectId, // Assuming it's a reference to another document
    //         ref: 'Login', // Replace 'BasicEmployee' with the actual name of the referenced model
           
    //       },
    //   fixedBasic: {
    //     type: Number,
    //     required: false,
    //   },
    //   arrearBasic: {
    //     type: Number,
    //     required: false,
    //   },
    //   earningsTotal: {
    //     type: Number,
    //     required: false,
    //   },
    //   incomeTax: {
    //     type: Number,
    //     required: false,
    //   },
    //   deductionsTotal: {
    //     type: Number,
    //     required: false,
    //   },
    //   personalDetails_id:{
    //     type: Number,
    //     required: false,
    //   },
    // }, { timestamps: true });
    
    // const FinancialDetail = userDBConnection.model('FinancialDetail', financialDetailsSchema);
    
    // export default FinancialDetail;