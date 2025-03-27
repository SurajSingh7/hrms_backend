import mongoose from 'mongoose';

const circularMessageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  department: { type: String, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
},{timestamps : true});

const Message = mongoose.model('Message', circularMessageSchema);

export default Message;
