import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY 
});

const uploadOnCloudinary = async (localPath) => {
    try {
        if(!localPath) return null

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localPath, {
            resource_type: "auto"
        })

        // file uploaded successfully
        // console.log("Cloudinary Upload Successful: ", response.url);
        fs.unlinkSync(localPath);
        return response
    } catch (error) {
        fs.unlinkSync(localPath) // remove the locally saved temporary file as the upload operation got failed

        return null;
    }
}

const deleteFromCloudinary = async (url) => {
    try {
        const urlParts = url.split('/');

        const uploadIndex = urlParts.indexOf('upload');

        let publicId = '';
        if (uploadIndex !== -1) {
            let image = urlParts[uploadIndex + 2]
            image = image.split('.');
            publicId = image[0]
        }
        await cloudinary.uploader.destroy(publicId);
        return true

    } catch (error) {
        console.log("Not able to delete: ", error?.message)
        return false
    }
}

export { uploadOnCloudinary, deleteFromCloudinary };





















