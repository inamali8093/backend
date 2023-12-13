import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath)=>{
        try {
            if(!localFilePath) return null
            // upload the file in the cloudinary
           const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type: "auto"
            })
            // file has been uploaded successfully
            console.log("file has uploaded on cloudinary",response);
            return response
        } catch (error) {
            fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload opration is failed
        }
}

cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });