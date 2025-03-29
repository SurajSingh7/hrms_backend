import mongoose from "mongoose";
const {Schema} = mongoose;

const DepartMentSchema = new Schema ({
    name : {type : String, require : true},
    description : {type : String},
    parent_id : {type : Schema.Types.ObjectId, ref : 'departments', default : null},
    status : {type : Boolean, default : true},
}, {timestamps : true});

const departmentModel = mongoose.model("departments", DepartMentSchema);

export default departmentModel;