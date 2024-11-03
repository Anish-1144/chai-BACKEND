// require('dotenv').config({path: "./env"})
import  dotenv  from "dotenv";

import { app } from "./app.js";
import { DB_NAME } from "./constants.js";

import connectDB from "./db/index.js";



dotenv.config({
    path: './env'
})


 connectDB()
.then(()=>{
    app.listen(process.env.PORT || 6000,()=>{
        console.log(`port are connected ${process.env.PORT}`);
        

    })

 })
.catch((err)=>{
    console.log(`mono-db connection faild from index.js ${process.env.PORT}`, err);
    
 })



