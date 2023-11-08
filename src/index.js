//require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import connectDB from './db/index.js';
import { app } from './app.js'

dotenv.config({
    path: './env'
})


connectDB()
.then(()=>{
    app.on("error",(error)=>{  // here we are listening for the error event and calling a callback as per the event
        console.log("ERRR:",error);
        throw error
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is runnig at port : ${process.env.PORT}`);
    })

})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err);
})



/*
;( async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    } catch (error) {
        console.error("ERROR:",error);
        throw error
    }
})()
*/