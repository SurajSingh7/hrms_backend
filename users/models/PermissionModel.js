import mongoose from "mongoose";


const permissionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    resources: { type: String }, // Add this field
    access: { type: String }, // Add this field
    menuName: {type: String},
    department:{type:String}
},{timestamps : true});

export default (connection) => connection.model('Permission', permissionSchema);
