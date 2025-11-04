import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async () =>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINANRY_NAME,
        api_key: process.env.CLOUDINANRY_API_KEY,
        api_secret: process.env.CLOUDINANRY_SECRET_KRY,
    })
}

export default connectCloudinary