import mongoose from "mongoose";
const { Schema} = mongoose;

const DispensaryLocationSchema = new Schema({
    name : {type : String, required : true},
    location :  {type : String, required : true},
    address: {type : String, required : true},
    phone : {type : String},
    status : {type : Boolean, default : true},
}, {timestamps : true});

const DispensaryLocation = mongoose.model('dispensary-location', DispensaryLocationSchema);

export default DispensaryLocation;