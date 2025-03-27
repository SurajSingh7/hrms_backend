import mongoose from "mongoose";

// Define and register the Role schema/model
const roleSchema = new mongoose.Schema({
    name: String,
},{timestamps : true});

const Role = mongoose.model("roles", roleSchema);

export default Role;
