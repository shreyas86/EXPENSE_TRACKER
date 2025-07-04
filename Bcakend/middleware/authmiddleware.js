import jwt from "jsonwebtoken"
import usermodel from "../models/User.js"

export const protect= async(req,res,next)=>{
    let token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(400).json({message:"not authorized,no token"})
    }

    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user= await usermodel.findById(decode.id).select("-password");
        next()
    } catch (error) {
        res.status(400).json({mesage:"not authorized, toekn failed"})
    }
}
