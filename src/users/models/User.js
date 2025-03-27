import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String,required: true},
    email: {type: String,unique: true,required: true},
    password: { type: String,required: true},
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }
},{timestamps : true})

const User=mongoose.model('User', userSchema);

export default User;