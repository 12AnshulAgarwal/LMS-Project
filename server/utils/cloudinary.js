import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    cloud_name:process.env.CLOUDNAME
})

export const uploadMedia=async(file)=>{
    try{
        const uploadResponse=await cloudinary.uploader.upload(file,{
            resource_type:"auto"
        })
        return uploadResponse
    }
    catch(err){
        console.log(err);
    }
};

export const deleteMediaFromCloudinary=async(publicId)=>{
    try{
        await cloudinary.uploader.destroy(publicId); 
    }
    catch(err){
        console.log(err)
    }
}

export const deleteVideoFromCloudinary=async(publicId)=>{
    try{
        await cloudinary.uploader.destroy(publicId,{resource_type:"video"}); 
    }
    catch(err){
        console.log(err)
    }
}
