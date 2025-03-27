import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  login_id: { type: Schema.Types.ObjectId,ref: 'Login'},
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

const User = mongoose.model('User', userSchema);

export default User;