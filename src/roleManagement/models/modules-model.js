import mongoose from "mongoose";
const {Schema} = mongoose;

const ModuleSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    url : {type: String},
    icon : {type: String},
    parent_id : {type: Schema.Types.ObjectId, ref: 'Module', default : null},
    display_order : {type: Number, default: 0},
    is_menu_item : {type: Boolean, default: false},
    status : {type : Boolean, default: true},
}, {timestamps : true});

const moduleModel = mongoose.model("Module", ModuleSchema);

export default moduleModel;;