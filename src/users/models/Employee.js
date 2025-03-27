import mongoose from 'mongoose';
const { Schema } = mongoose;

const employeeSchema = new Schema({
  login_id: {type: Schema.Types.ObjectId, ref: 'Login'},
  fatherName: String,
  designation: String,
  maritalStatus: String,
  confirmationPeriod: String,
  confirmationDate: String,
  dateOfAnniversary: String,
  retirementAge: String,
  dateOfRetirement: String,
  pfAccountNo: String,
  esiNo: String,
  grade: String,
  noOfChildren: Number,
  costCentre: String,
  branch: String,
  uanNumber: String,
  panGirNo: String,
  empPf: String,
  pensionFund: String,
  stopPayment: String,
  pfDateOfJoining: String,
  terminationDate: String,
  bankName: String,
  location: String,
  payMode: String,
  seniorCitizen: String,
  payrollProcess: String,
  itaxRegimeType: String,
  reportingManager: String,
  esicDateOfJoining: String
}, {
  timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;