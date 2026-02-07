const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async () => {
  try {
    const result = await cloudinary.uploader.upload(
      '/workspaces/codex1/istockphoto-1323205897-1024x1024.jpg',
      {
        folder: 'mithila-makhana',
        resource_type: 'auto'
      }
    );
    console.log('Upload successful!');
    console.log('URL:', result.secure_url);
    console.log('Full result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Upload failed:', error.message);
    process.exit(1);
  }
};

uploadToCloudinary();
