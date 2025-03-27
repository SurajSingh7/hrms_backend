import mongoose from 'mongoose';
const { Schema } = mongoose;

const uploadFileInfoSchema = new mongoose.Schema({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number
});

const avatarSchema = new mongoose.Schema({
  file: { type: Object, required: true },
  fileList: { type: [Object], required: true }
});

const employeeSchema = new Schema({
  login_id: { type: Schema.Types.ObjectId, ref: 'Login' },
  employeeCode: {
    type: String,
    unique: true,
    trim: true
  },
  companyName: {
    type: String,
  },
  firstName: {
    type: String,

  },
  middleName: {
    type: String
  },
  lastName: {
    type: String,

  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  category: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  dateOfJoining: {
    type: Date
  },
  esiLocation: {
    type: String
  },
  esiDispensary: {
    type: String
  },
  biometricMachineLocation: {
    type: String
  },
  profTaxLocation: {
    type: String
  },
  esslName: {
    type: String
  },
  avatar: {
    type: avatarSchema
  },
  profileImage: {
    type: String
  },
  uploadFileInfo: [uploadFileInfoSchema],
  metroOrNonMetro: {
    type: String,
    enum: ['Metro', 'Non-Metro']
  }
}, { timestamps: true });

const BasicEmployee = mongoose.model('BasicEmployee', employeeSchema);

export default BasicEmployee;