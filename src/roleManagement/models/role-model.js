import mongoose from "mongoose";
const {Schema} = mongoose;

const RoleSchema = new Schema({
    name: {type: String, required: true, unique: true, trim: true, index: true},
    description: {type: String},
    status : {type: Boolean, default: true, index : true},
}, {timestamps : true});

const roleModel = mongoose.model('Role', RoleSchema);

export default roleModel;