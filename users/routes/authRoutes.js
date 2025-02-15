import express from 'express'
import { signUp,Loginn, Logout ,authenticatedData, updatePassword,forgotPassword,setup2Fa,verify2Fa,reset2Fa,userSession} from '../controllers/AuthController.js'
import verifyMfaSession from '../../middlewares/authMiddleware.js'
const router = express.Router();
 
// router.post('/signup',signUp,uploadAny(),uploadFiles)
router.post('/signup',signUp)
router.get('/authdata',authenticatedData);
router.post('/login',Loginn)
router.get('/logout',Logout)
router.post('/updatePassword',updatePassword)
router.post('/forgot',forgotPassword);
router.get('/user-session',userSession);

router.post("/2fa/setup", verifyMfaSession,setup2Fa);
router.post("/2fa/verify", verifyMfaSession,verify2Fa);
router.post("/2fa/reset", verifyMfaSession,reset2Fa);


export default router;







// import express from 'express'
// import { signUp,Loginn, Logout ,authenticatedData, updatePassword,forgotPassword,userSession} from '../controllers/AuthController.js'
// const router = express.Router();
 
// // router.post('/signup',signUp,uploadAny(),uploadFiles)
// router.post('/signup',signUp)
// router.get('/authdata',authenticatedData);
// router.post('/login',Loginn)
// router.get('/logout',Logout)
// router.post('/updatePassword',updatePassword)
// router.post('/forgot',forgotPassword);

// router.get('/user-session',userSession);


// export default router; 