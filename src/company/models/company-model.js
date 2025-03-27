import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyName: { type: String,required: true,unique: true, trim:true,index : true}, 
    address: { type: String, required: true},
    gstNumber:{ type: String,required: true,unique: true, trim: true},
    state:{type: String, required: true,unique: true, trim : true},
    alias:{type: String,required: true, unique: true, trim: true},
    status : {type : Boolean, default : true},
});

const Company = mongoose.model('company', companySchema);
export default Company;