// backend/controllers/web/verification.controller.js
import Verification from '../../models/Verification.js';

// 🔹 GET MY VERIFICATION STATUS
export const getMyVerification = async (req, res) => {
  try {
    const verification = await Verification.findOne({ model: req.user._id });
    res.json({ success: true, verification: verification || { status: 'pending' } });
  } catch (error) {
    console.error('Get verification error:', error);
    res.status(500).json({ success: false, message: 'Failed to get verification', error: error.message });
  }
};

// 🔹 SUBMIT / UPDATE VERIFICATION DOCUMENTS
// Expects file URLs already uploaded via a file-upload service (S3/Cloudinary/etc.)
export const submitVerification = async (req, res) => {
  try {
    const { aadhaar, pan, passport, selfieUrl } = req.body;

    const verification = await Verification.findOneAndUpdate(
      { model: req.user._id },
      {
        $set: {
          ...(aadhaar && { aadhaar }),
          ...(pan && { pan }),
          ...(passport && { passport }),
          ...(selfieUrl && { selfieUrl }),
          status: 'pending', // resets to pending on any resubmission
          rejectionReason: null,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Verification documents submitted! Waiting for admin review.',
      verification,
    });
  } catch (error) {
    console.error('Submit verification error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit verification', error: error.message });
  }
};
