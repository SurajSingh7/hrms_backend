import mongoose from 'mongoose';
const { Schema } = mongoose;

const financialDetailsSchema = new Schema({
  login_id: {type: Schema.Types.ObjectId,ref: 'Login'},
  fixedBasic: {type: Number,required: false},
  arrearBasic: {type: Number,required: false},
  earningsTotal: {type: Number,required: false},
  incomeTax: {type: Number,required: false},
  deductionsTotal: {type: Number,required: false},
  personalDetails_id: {type: Number,required: false},
}, { timestamps: true });

const FinancialDetail = mongoose.model('FinancialDetail', financialDetailsSchema);

export default FinancialDetail;
