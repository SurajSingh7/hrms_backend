import mongoose from 'mongoose';
const {Schema} = mongoose;

const taskSchema = new Schema({
  login_id: {type : Schema.Types.ObjectId,ref: 'Login'},
  priority: Number,
  selectManager: String,
  viewOnly: String,
  approvalMust: String,
  approvedCancelRights: String,
  checkboxOptions: [String]
},{timestamps : true});

const ApprovalMatrix = mongoose.model('Request', taskSchema);

export default ApprovalMatrix;
