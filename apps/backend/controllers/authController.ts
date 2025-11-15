import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express"; 
import { prisma } from "store"
dotenv.config();


const login = async (req:express.Request,res:express.Response)=>{

    const {email} = req.body;

    if(!email){
        return res.status(400).json({message:"Email and OTP are required"});
    }


    const user  = await prisma.user.findUnique({
        where:{
            email:email
        }
    })


    res.status(200).json({message:"Login successful"});
}

export {login};