// require('dotenv').config({path: "./env"})
import  dotenv  from "dotenv";


import { DB_NAME } from "./constants.js";

import connectDB from "./db/index.js";

// const app = express()

// (async()=>{

//     try{

//       await  mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//       app.on("error",(error)=>{
//             console.log("ERROR",error);
//             throw error


//       })

//       app.listen(process.env.PORT,()=>{
//         console.log(`app is listening${process.env.PORT}`);
        
//       });





//     }catch(error){
//         console.error("ERROR:", error)
//             throw error
//     }






// })()// iffe in javascript


dotenv.config({
    path: './env'
})


 connectDB()



