import mongoose from "mongoose";
const {Schema} = mongoose;

const PermissonSchema = new Schema({
    name: { type: String, required: true, index : true},
    description: { type: String},
    code : { type: String, required: true, unique : true, trim : true, index: true}, // Create,read,update,delete
    status : { type: Boolean, default: true},   
}, {timestamps : true});

const permissonModel = mongoose.model('permisson', PermissonSchema);

export default permissonModel;