import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";
import  prisma  from "store";
import sgMail from '@sendgrid/mail'
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)
// Note: If you need EU data residency, configure it in your SendGrid account settings
// // or use a EU-specific API key

// const testmsg = {
//   to: 'jatin04072005@gmail.com', // Change to your recipient
//   from: `${process.env.SENDGRID_EMAIL_FROM as string}`, // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(testmsg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
// const emailTransporter =
//   EMAIL_USER && EMAIL_PASSWORD
//     ? nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: EMAIL_USER,
//           pass: EMAIL_PASSWORD,
//         },
//       })
//     : null;

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOtp = async (email: string) => {
  if (!sgMail) {
    console.error("Email transporter not configured");
    return false;
  }

  const otp = generateOTP();

  try {
    await prisma.oTP.create({
      data: {
        email: email,
        oldOTP: parseInt(otp),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });
    const msg = {
        from: `${process.env.SENDGRID_EMAIL_FROM}`,
        to: email,
        subject: "Your OTP for Email Verification",
        text: `Hello,\nYour OTP for email verification is: ${otp}\nThis OTP is valid for 5 minutes.\n\nTeam DivForces`,
        html: `
          <div style="font-family: Arial, sans-serif; font-size:16px; line-height:1.6; color:#333;">
            <p>Hello,</p>
            
            <p>Your One-Time Password (OTP) for email verification is:</p>
            
            <h2 style="background:#f3f3f3; padding:10px 15px; width:max-content; border-radius:6px; letter-spacing:2px;">
              ${otp}
            </h2>
      
            <p>This OTP is valid for <strong>5 minutes</strong>. Do not share this code with anyone.</p>
      
            <br/>
            <p>Thanks,<br/>Team DivForces</p>
          </div>
        `,
      };
      
      sgMail
        .send(msg)
        .then(() => console.log("Email sent"))
        .catch((error) => console.error(error));
      
    return true;
  } catch (err) {
    console.error("Failed to send email OTP:", err instanceof Error ? err.message : String(err));
    return false;
  }
};

const verifyOtp = async (email: string, otp: number) => {
  if (!email || !otp) {
    return {
      success: false,
      message: "Email & OTP are required",
    };
  }

  try {
    const IsValid = await prisma.oTP.findFirst({
      where: {
        email: email,
        oldOTP: otp,
      },
    });
    if (!IsValid) {
      return {
        success: false,
        message: "INVALID OTP!",
      };
    }

    return {
      success: true,
      message: "OTP Verified Successfully!",
    };
  } catch (error: any) {
    return {
      success: false,
      message: "OTP VERIFICATION FAILED!",
      error: error.message,
    };
  }
};

/**
 * LOGIN FUNCTION
 */
const login = async (req: express.Request, res: express.Response) => {
  let { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ message: "Email and OTP are required", success: false });
  }

   email = email.toLowerCase()
  const isValid = await verifyOtp(email, Number(otp));
  console.log(isValid)

  if (!isValid.success) {
    return res.status(400).json({
      message: "Verify OTP First!",
      success: false,
    });
  }

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({
      message: "User Not Found!",
      success: false,
    });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

  return res.status(200).json({
    message: "Login successful",
    token,
    user,
    success: true,
  });
};

const signUp = async (req:express.Request ,res : express.Response) => {
  
    let {email ,name , role} = req.body;

    if(!email || !name || !role){
         res.status(400).json({
          message:"Email Name and Role are Required !",
          success:false
        })
    }

 email = email.toLowerCase();
    const user = await prisma.user.create({
        data:{
            profileName: name,
            email:email,
            role: role,
        }
    })

    if(!user){
        res.status(400).json({
            message:"something went Wrong",
            success:false
        })
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

    res.status(200).json({
        message:"Account Created Successfully !",
        success:true,
        token,
        user
    })

}

export { login, verifyOtp ,signUp,sendOtp};
