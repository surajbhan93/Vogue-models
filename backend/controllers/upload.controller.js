// backend/controllers/upload.controller.js
import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (req, res) => {
  try {
    // ✅ Extract file from req.file or req.files array
    const file = req.file || (req.files && req.files[0]);

    if (!file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    const b64 = Buffer.from(file.buffer).toString('base64');
    const dataURI = `data:${file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'vogue_agency',
      resource_type: 'auto',
    });

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message,
    });
  }
};