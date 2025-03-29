import mongoose from "mongoose";
const {Schema} = mongoose;

const ChangeLogsSchema = new Schema({
    user_id : {type: Schema.Types.ObjectId, ref: 'User'},
    user_name : {type: String},
    action : {type: String},
    ip_address : {type: String},
    resource_affected : {type: String},
    changes : {type: Object},
    browser_agent : {type: String},
}, {timestamps : true});

const changeLogsModel = mongoose.model('ChangeLogs', ChangeLogsSchema);

export default changeLogsModel;