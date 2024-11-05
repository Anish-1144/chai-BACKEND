import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponce} from "../utils/ApiResponce.js"

const genrateAccessTokenAndRefrashToken = async(userId) => {
     try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken =refreshToken
        await user.save({validateBeforeSave : false});
        return { accessToken, refreshToken}


     } catch (error) {
      throw new ApiError("error in genrating access token and refrash token ")
      
     }
}


const registerUser = asyncHandler( async (req , res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { fullName, email, username, password } = req.body;
    // console.log("req.body => :", req.body);
  //  console.log("username",username);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "all field are required full name ,email");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username exisit");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // console.log(req.files);

//   const coverImageloclPath = req.files?.coverImage[0]?.path;

    let coverImageloclPath;
        if (
            req.files &&
            Array.isArray(req.files.coverImage) &&
            req.files.coverImage.length > 0
        ) {
            coverImageLocalPath = req.files.coverImage[0].path;
        }


  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required ");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageloclPath);

  //   console.log("avatar  cloud urlee", avatarLocalPath);

  //   console.log(" avatar  cloud url", avatar);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required2");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    // username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  console.log("user._id", user._id);

  if (!createdUser) {
    throw new ApiError(
      500,
      "something went wrong while registering the user in server"
    );
  }

  return res
    .status(201)
    .json(new ApiResponce(200, createdUser, "created  user successfull "));
})



// login-User
const loginUser = asyncHandler(async(req, res) => {
  // res.body =>data
  //  same username or email 
  // if user hai to password check
  // password ager true hai to genrate access tokan or refresh token
  // nhi hai to err
  // and in last we send this token into frontend by cookies


  const {username ,email ,password} = req.body;
        if((!username || !email)){
          throw new ApiError("username ,email is requierds")
        }

  const user = await User.findOne({
   $or:[{username},{email}]
  })


  if (!user) {
    throw new ApiError(400,"user does not exist")
    
  }
   
 const passwodIsValid = user.isPasswordCorrect(password)
   
   if (!passwodIsValid) {
    throw new ApiError(400," password is not valied")   
   }

   const {accessToken,refreshToken } = genrateAccessTokenAndRefrashToken(user._id)

   const loggedUserId = await User.findById(user._id).select(
     "-password -refreshToken"
   );

  //  cookies
   const options = {
    httpOnly : true,
    secure : true

   }
  

   return res.status(200)
   .cookies("accessToken",accessToken)
   .cookies("refreshToken", refreshToken)
   .json(
    ApiResponce(
      200,
      {
        user : loggedUserId, accessToken , refreshToken
        
      },
      "User logged in seccessfully"
    )
   )
})


export {

  registerUser,
  loginUser

}