import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const verifyMfaSession = (req, res, next) => {
    const token = req.cookies["mfaSession"];
    if (!token) {
      return res.status(401).json({ message: "MFA Session Expired. Please log in again.",key : "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_STR);
      if (!decoded.isMfaActive) {
        return res.status(401).json({ message: "Invalid MFA session token", key : "Unauthorized" });
      }
      
      req.userId = decoded._id;
      next();
    } catch (error) {
        console.log('Error occured in verifyMfaSession',error)
        return res.status(401).json({ message: "Invald token!" , error : true});
    }
  };

export default verifyMfaSession;