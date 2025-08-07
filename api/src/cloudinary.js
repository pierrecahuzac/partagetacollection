const axios = require("axios");
const FormData = require("form-data");
const cloudinary = require("cloudinary").v2; 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUtils = {
 
  async uploadToCloudinary(fileBuffer, mimetype) {
    try {
      const b64 = Buffer.from(fileBuffer).toString("base64");
      const dataURI = "data:" + mimetype + ";base64," + b64;
      return await cloudinary.uploader.upload(dataURI);
    } catch (error) {
      console.error("Erreur lors de l'upload via Cloudinary SDK:", error.message || error);
    }
  },

  async uploadToCloudinaryDirect(fileBuffer, mimetype) {
   
    try {
      const form = new FormData();
      form.append("file", fileBuffer, {
        filename: "image.jpg",
        contentType: mimetype,
      });

      const timestamp = Math.round((new Date()).getTime() / 1000); 

      const paramsToSign = {
        timestamp: timestamp,
        
      };

      const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_API_SECRET
      );

      form.append("timestamp", timestamp);
      form.append("api_key", process.env.CLOUDINARY_API_KEY);
      form.append("signature", signature);

    

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`, 
        form,
        {
          headers: form.getHeaders(),
          
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de l'upload direct vers Cloudinary :",
        error.response ? error.response.data : error.message
      );
    }
  },

  getOptimizedImageUrl(publicId, options = {}) {
    if (!publicId) {
      return null; 
    }
    const defaultOptions = {
      fetch_format: 'auto',
      quality: 'auto',       
      secure: true           
    };
    
    const finalOptions = { ...defaultOptions, ...options };

    return cloudinary.url(publicId, finalOptions);
  },
};

module.exports = cloudinaryUtils;