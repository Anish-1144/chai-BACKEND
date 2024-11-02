import { v2 as cloudinary } from "cloudinary";
import fs from "fs"


cloudinary.config({

    cloud_name : process.env.CLOUDINARY_CLOUD_NAME ,
    api_key : process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET ,

});



const uploadeonCloudinary= async(localFilePath) => {
    try {
        if(!localFilePath) return null
        // uploadthe file on cloudinary
       const responce = await cloudinary.v2.uploader.upload(localFilePath , {
            resource_type : "auto"
        });
        // uplaoad success
        console.log("success file upload" , responce.url);
        return responce ;
        
    } catch (error) {
        fs.unlinksync(localFilePath) //remove local file if upload fail
        
    }
}

// cloudinary.v2.uploader.upload()

export { uploadOnCloudinary };