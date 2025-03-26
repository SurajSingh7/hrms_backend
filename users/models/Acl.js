import mongoose from "mongoose";
const aclSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    permission: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission' },
    resource: String
},{timestamps : true});


const ACL = mongoose.model('ACL', aclSchema);