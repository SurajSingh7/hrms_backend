import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from 'crypto';

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  confirmPassword: { type: String },
  email: { type: String},
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
  isMfaActive: { type: Boolean, default: false },
  twoFactorSecret: { type: String },
  passwordChangedAt: { type: Date },
  passwordResetToken: { type: String },
  paswordResetTokenExpires: { type: Date },
  departmentOfficialNumber: { type: Number },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  //password encryption
  this.password = await bcrypt.hash(this.password, 10);

  this.confirmPassword = undefined;
  next();

});
userSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.paswordResetTokenExpires = Date.now() + 10 * 60 * 1000
  console.log(resetToken, this.passwordResetToken)
  return resetToken;
}
const Login = mongoose.model('Login', userSchema);

export default Login;