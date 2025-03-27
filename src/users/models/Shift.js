import mongoose from 'mongoose';
const { Schema } = mongoose;

const shiftSchema = new Schema({
  login_id: {type: Schema.Types.ObjectId,ref: 'Login'},
  shiftTime: { type: String },
  weaklyOff: { type: String },
},{timestamps : true});

const Shift = mongoose.model('Shift', shiftSchema);

export default Shift;