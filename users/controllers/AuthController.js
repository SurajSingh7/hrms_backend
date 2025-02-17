import jwt from "jsonwebtoken";
import BasicEmployee from "../models/BasicEmployee.js";
import Employee from "../models/Employee.js";
import FinancialDetail from "../models/FinancialDetail.js";
import Shift from "../models/Shift.js";
import User from "../models/PersonalDetails.js";
import Role from "../models/Role.js";
import Request from "../models/ApprovalMatrix.js";
import Login from "../models/Login.js";
import bcrypt from "bcrypt";
import Document from "../models/Document.js";
import speakeasy from "speakeasy";
import qrCode from "qrcode";

import { getFormData as getStep1FormData } from "./basicEmployeeController.js";
import { getFormData as getStep4FormData } from "./roleController.js";
import { getFormData as getStep2FormData } from "./employeeController.js";
import { getFormData as getStep3FormData } from "./financialDetailController.js";
import { getFormData as getStep5FormData } from "./shiftController.js";
import { getFormData as getStep6FormData } from "./personalDetailsController.js";
import { getFormData as getStep7FormData } from "./requestController.js";
import {getFormData as getStepn4FromData}  from "./documentController.js";

import { checkPermission } from "../utils/checkPermission.js";
import sendEmail from "../utils/email.js";
import mongoose from "mongoose";


let image=[];

const signUp = async (req, res) => {
  try {
    // Hash the password
    //const salt = await bcrypt.genSalt(10);
   // const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let formData = {
      ...getStep1FormData(),
      ...getStep2FormData(),
      ...getStep6FormData(),
      ...getStep3FormData(),
      ...getStep5FormData(),
      ...getStep4FormData(),
      ...getStep7FormData(),
      ...getStepn4FromData(),
      step8: {
        ...req.body,
        password: req.body.password, // Save the hashed password
      },
    };

    

    console.log(formData);
    console.log(image,"image........1234->");
    console.log(req.file,"req.file........1234->");

    const step8 = new Login(formData.step8);
    const loginid = await step8.save();

   
    
    // // Saving the remaining form data linked to login_id
    // const step1 = new BasicEmployee(formData.step1);
    // step1.login_id = loginid._id;
    // await step1.save();

     // Saving the remaining form data linked to login_id
     console.log("line 67");
     const defaultPhoto = "https://res.cloudinary.com/dxkxa0mkq/image/upload/v1737911893/default_j7sjzb.png";
     formData.stepn4 = formData.stepn4 || {}; // Ensure stepn4 exists
     formData.stepn4.photo = formData.stepn4.photo || defaultPhoto; // Assign default photo if none exists
     
     console.log("line 71")
     
     formData.step1 = formData.step1 || {}; // Ensure stepn1 exists
     formData.step1.profileImage=formData.stepn4.photo;

     console.log("line 75")
     const step1 = new BasicEmployee(formData.step1);
     step1.login_id = loginid._id;
     await step1.save();

    const step2 = new Employee(formData.step2);
    step2.login_id = loginid._id;
    await step2.save();

    const step3 = new User(formData.step3);
    step3.login_id = loginid._id;
    await step3.save();


    // Document @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    const stepn4 = new Document(formData.stepn4);
    stepn4.login_id = loginid._id;
    await stepn4.save();




    const step4 = new FinancialDetail(formData.step4);
    step4.login_id = loginid._id;
    await step4.save();
  

    console.log("step 5->",formData.step5)
    const step5 = new Shift(formData.step5);

    step5.login_id = loginid._id;
    await step5.save();

    // const step6 = new Role(formData.step6);
    // step6.login_id = loginid._id;
    // await step6.save();

    const step7 = new Request(formData.step7);
    step7.login_id = loginid._id;
    await step7.save();

    formData = {};
    return res.status(201).send("submitted successfully....");
  } catch (err) {
    console.log("Error occurred:", err);
    return res.status(500).json({ error: err.message });
  }
};
const Loginn = async (req, res) => {
  const user = await Login.findOne({ email: req.body.email });

  // console.log("AuthController loginn-> user ",user);
  if (!user) {
    return res.status(404).send({
      message: "user not found",
    });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).send({
      message: "invalid credentials",
    });
  }

  const token = jwt.sign({ _id: user._id, isMfaActive: true },
    process.env.SECRET_STR,
    { expiresIn: "5m" });

  res.cookie("mfaSession", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.send({ message: "success" });
};
const Logout = (req, res) => {

  res.cookie('userSession', '', {
      httpOnly: true,
      secure: true,
      maxAge: 0,
      sameSite: 'None',
      path: '/',
      domain: '.gtel.in'
    });

  res.send({  message: "successfully" });
};
const protect = async (req, res, next) => {
  try {
    const cookie = req.cookies["userSession"];
    const claims = jwt.verify(cookie, process.env.SECRET_STR);
    //console.log(claims)
    if (!claims) {
      return res.status(401).send({ error: true, message: "Unauthorised" });
    }
  } catch (error) {
    return res.status(401).send({ error: true, message: "Unauthorised" });
  }
  next();
};
const authenticatedData = async (req, res) => {
  //const authToken = req.headers.authorization.split(' ')[1]; // Extract token from header

    // Ensure cookie is present
    const token = req.cookies["userSession"];
    if (!token) {
      return res.status(401).json({ error: true, message: "Unauthorized: No token provided" });
    }

    const cookie = req.cookies["userSession"];

    const claims = jwt.verify(cookie, process.env.SECRET_STR);
    // const user = await User.findById(claims._id)
    const user = await Login.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(claims._id) } },
      {
        $lookup: {
          from: "roles", // Collection to join with
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
      { $unwind: "$role" }, // Unwind the role array
      {
        $lookup: {
          from: "permissions", // Collection to join with
          localField: "role.permissions",
          foreignField: "_id",
          as: "role.permissions",
        },
      },
      {
        $lookup: {
          from: "departments", // Collection to join with
          localField: "department",
          foreignField: "_id",
          as: "department",
        },
      },
      { $unwind: "$department" }, // Unwind the department array
      {
        $lookup: {
          from: "roles", // Collection to join with
          localField: "department.roles",
          foreignField: "_id",
          as: "department.roles",
        },
      },
      { $unwind: "$department.roles" }, // Unwind the department roles array
      {
        $lookup: {
          from: "permissions", // Collection to join with
          localField: "department.roles.permissions",
          foreignField: "_id",
          as: "department.roles.permissions",
        },
      },
      {
        $lookup: {
          from: "basicemployees", // Collection to join with
          localField: "_id", // Assuming Login document's _id is the reference
          foreignField: "login_id", // Field in basicemployee that references the Login document
          as: "basicemployees",
        },
      },
      { $unwind: { path: "$basicemployees", preserveNullAndEmptyArrays: true } }, // Unwind if needed
      {
        $project: {
          // Specify the fields to include or exclude in the output
          "email":1,
          "role._id": 1,
          "role.name": 1,
          "role.permissions": 1,
          "department._id": 1,
          "department.name": 1,
          "department.roles": 1,
          "basicemployees": 1, // Include fields from basicemployees if needed
        },
      },
    ]).option({ maxTimeMS: 30000 }).exec();
    
    
    
    

    // res.status(200).send({
    //   role: user.role.name,
    //   permissions: user.role.permissions.map(p => p.name),
    //   department: user.department.name,
    // });
    //const hasAccess =  checkPermission(user);
    //console.log(hasAccess)
    // res.cookie("hasAccess", hasAccess, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000, // 1 day
    // });
    res.send({ "error": false, "data": user });
  
};
const forgotPassword = async (req,res,next) => {
  const user = await Login.findOne({email:req.body.email})
  if(!user){
    return res.status(400).send({ error: true, message: "user not found" });

  }
//2.generate a random reset token
const resetToken = user.createResetPasswordToken()
await user.save({validateBeforeSave:false});
//3.SEND THE TOKEN BACK TO THE USER EMAIL
const resetUrl = `${req.protocol}//${req.get('host')}/api/v1/users/reset/${resetToken}`
const message = `we have received a password reset request please use the below link to reset your password\n\n${resetUrl}\n\nThis reset password link will be valid only for 10 minutes`
try {
 await sendEmail({
      email:user.email,
      subject:'password change request received',
      message:message
  });
  res.status(200).send({"error":false,"message":"password reset link send to the user email"})

} catch (error) {
  user.passwordResetToken=undefined
  user.passwordResetTokenExpires=undefined
  user.save({validateBeforeSave:false})

 // return new CustomError('There was an error sending password reset email please try again later',500);
 res.status(500).send({"error":false,"message":"There was an error sending password reset email please try again later"})

}

}
const updatePassword = async (req,res) => {
  const cookie = req.cookies["userSession"];

if (!cookie) {
  return res.status(401).send({ error: true, message: "Please Login" });
}

try {
  const claims = jwt.verify(cookie, process.env.SECRET_STR);

  if (!claims) {
    return res.status(401).send({ error: true, message: "Unauthorized" });
  }

  const user = await Login.findById(claims._id);
  console.log(user);

  if (!user) {
    return res.status(401).send({ error: true, message: "User not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(req.body.currentPassword, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).send({
      message: "The Current Password you Provided is Wrong!",
    });
  }

  // Update the user's password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  // Generate a new token
  const token = jwt.sign({ _id: claims._id }, process.env.SECRET_STR);

  // Send success response
  res.status(200).send({
    status: 'success',
    token,
    data: {
      user,
    },
  });
} catch (error) {
  // Handle errors, such as token verification failure
  console.error(error);
  return res.status(401).send({ error: true, message: "Invalid or expired token" });
}

//1.GET CURRENT DATA FROM DATABASE
//2.check if supplied current password is correct
//3.if supplied password is correct update user password with the new value

//Login user send jwt
}
const userSession = async (req, res) => {
  //const authToken = req.headers.authorization.split(' ')[1]; // Extract token from header

    // Ensure cookie is present
    const token = req.cookies["userSession"];
    if (!token) {
      return res.status(401).json({ error: true, message: "Unauthorized: No token provided" });
    }
    return res.status(200).json({ error: true, message: "authorized" });
  
};

const setup2Fa = async (req, res) => {
  try {
    // check if the user has mfa enabled then we want to user enter their secret code and if not then we have to send the qr code to them
    const userId = req.userId;
    const user = await Login.findById(userId);
    if (!user) {
      return res.status(401).send({ error: true, message: "User not found" });
    }

    if (!user.isMfaActive) {
      const secret = speakeasy.generateSecret({ length: 20 });
      user.twoFactorSecret = secret.base32;
      await user.save();

      const url = speakeasy.otpauthURL({
        secret: secret.base32,
        label: user.email,
        issuer: 'gtel',
        encoding: 'base32',

      });

      const qrImageUrl = await qrCode.toDataURL(url);
      return res.status(200).json({ error: false, qrCode: qrImageUrl, secret: secret.base32 });
    }
    else {
      return res.status(200).json({ key: 'Already Enabled', message: "2FA is already enabled" });
    }


  }
  catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: true, error: error.message });
    }
    return res.status(500).json({ error: true, message: "Internal server error", error: error });
  }

}

const verify2Fa = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await Login.findById(userId);

    if (!user) {
      return res.status(401).send({ error: true, message: "User not found" });
    }

    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: true, message: "Token is required" });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 1,
    });

    if (!verified) {
      return res.status(400).json({ error: true, message: "Invalid 2FA token" });
    }

    let isAdmin = false;
    if(user.email ==="superAdmin@gmail.com"){
      isAdmin = true;
    }
    user.isMfaActive = true;
    await user.save();

    const authToken = jwt.sign({ _id: user._id, email: user.email, role: user.role, department: user.department }, process.env.SECRET_STR, {
      expiresIn: "1d",
    });


    res.cookie("userSession", authToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.clearCookie("mfaSession");

    return res.status(200).json({ success: true, message: "2FA is enabled", isAdmin });
  }
  catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: true, error: error.message });
    }
    return res.status(500).json({ error: true, message: "Internal server error", error: error });
  }

}

const reset2Fa = async (req, res) => {
  try {
    const cookie = req.cookies["userSession"];
    if (!cookie) {
      return res.status(401).send({ error: true, message: "Please Login" });
    }
    const claims = jwt.verify(cookie, process.env.SECRET_STR);
    if (!claims) {
      return res.status(401).send({ error: true, message: "Unauthorized" });
    }
    const user = await Login.findById(claims._id);
    if (!user) {
      return res.status(401).send({ error: true, message: "User not found" });
    }
    user.isMfaActive = false;
    user.twoFactorSecret = undefined;
    await user.save();
    return res.status(200).json({ error: false, message: "2FA is disabled" });

  }
  catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: true, error: error.message });
    }
    return res.status(500).json({ error: true, message: "Internal server error", error: error });
  }

}

export { signUp, Loginn, Logout, protect, authenticatedData,updatePassword,forgotPassword,userSession,setup2Fa,verify2Fa,reset2Fa };
