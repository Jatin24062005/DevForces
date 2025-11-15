import express from "express";
import { login, sendOtp, signUp } from "../controllers/authController";
const router = express.Router();


router.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("Hello World From AuthRoutes !");
});


router.post("/login",login)
router.post("/signUp",signUp)
router.post("/sendOtp",async (req : express.Request,res:express.Response)=>{
    let {email} = req.body;
    email = email.toLowerCase();
    try {
        await sendOtp(email);
        res.status(200).json({
            message:"OTP SEND SUCCESSFULLY !",
            success:true
        })
        
    } catch (error : any) {
         res.status(500).json({
            message:"Internal Server Error",
            success:false,
            error:error.message
         })
    }
})
export default router;