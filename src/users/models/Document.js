import mongoose from 'mongoose';
const { Schema } = mongoose;

const DocumentSchema = new mongoose.Schema({
  login_id: {type: Schema.Types.ObjectId,ref: 'Login'},  
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

 const Document= mongoose.model('Document', DocumentSchema);
 export default Document;