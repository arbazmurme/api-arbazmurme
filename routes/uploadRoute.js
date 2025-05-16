const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage, fileFilter } = require("../config/cloudinary");


const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// @desc    Upload image to Cloudinary
// @route   POST /api/v1/upload
// @access  Private (if you want to protect this route)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        url: req.file.path,
        publicId: req.file.filename,
        format: req.file.format,
        bytes: req.file.size,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during file upload",
      error: error.message,
    });
  }
});

module.exports = router;