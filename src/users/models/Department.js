import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: String,
    roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
}, { timestamps: true });

const Department = mongoose.model('Department', departmentSchema);

export default Department;