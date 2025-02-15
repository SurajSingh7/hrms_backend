import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    login_id: {
        type: Schema.Types.ObjectId, // Assuming it's a reference to another document
        ref: 'Login', // Replace 'BasicEmployee' with the actual name of the referenced model
       
      },
  // Self Service Role
  role: { type: String },
  // Declaration Activation
  declarationActivation: { type: String },
  // Activate Punch
  activatePunch: { type: String }
},{timestamps : true});

const Role1 = mongoose.model('Role1', userSchema);

export default Role1;
