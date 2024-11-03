import { v2 as cloudinary } from "cloudinary";
// import { response } from "express";
import fs from "fs"


cloudinary.config({

    cloud_name : process.env.CLOUDINARY_CLOUD_NAME ,
    api_key : process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET ,

});



const uploadOnCloudinary = async (localFilePath) => {
     console.log ( "from cloudenary",localFilePath);
    
  try {
    
    
    if (!localFilePath) return console.log("from clodenary");
    ;
    ;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath,{
      resourse_type: "auto",
      
    });
    console.log("hii from cloud");
    // console.log(response);
    // uplaoad success
    console.log("success file upload", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove local file if upload fail
  }
};

// cloudinary.v2.uploader.upload()

export {uploadOnCloudinary};