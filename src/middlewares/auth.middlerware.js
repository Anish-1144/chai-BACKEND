import {asyncHandler} from "../utils/asyncHandler"
import{ApiError} from "../utils/ApiError"
import jwt from "jsonwebtoken"
import { User } from "../model/user.model";


export const verifyJWT = asyncHandler(async(req,res,next)=>{
try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.relace("Bearer","")
    
     if(!token){
        throw new ApiError(401,"unauthorized access")
     }
    
    const decodedToken = jwt.verify(token, proccess.env.ACCESS_TOKEN_SECRET);
      
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user){
            throw new ApiError(402 ,"INVAlid acceSs ToKen")
        }
    
        req.user = user;
        next()



} catch (error) {
    throw new ApiError(401,error?.message||"invalid access token");
    
    
}
})