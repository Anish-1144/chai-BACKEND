import mongoose, { connect } from "mongoose";
import { DB_NAME } from "../constants.js";



const connectDB = async () => {

    try {
      
      const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
      console.log(`mongo connected:${connectionInstance.connection.host}`);
      // console.log("hello");

      
        
    } catch (error) {
        console.log("mongodb---FAild" ,error);
        // console.log(connectionInstance);
        
        process.exit(1)
        
        
    }

}

export default connectDB