import {asyncHandler} from "../utils/asyncHandler"
import{ApiError} from "../utils/ApiError"
import jwt from "jsonwebtoken"
import {user} from "../model/user.model"


export const verifyJWT = asyncHandler(async(req,res,next)=>{
 const token = req.cookies?.accessToken || req.header("Authorization")?.relace("Bearer","")

 if(!token){
    throw new ApiError(401,"unauthorized access")
 }

const decodedToken = jwt.varify(token, proccess.env.ACCESS_TOKEN_SECRET);
  
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
})