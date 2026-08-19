const express = require("express");
const router = express.Router();
const { loginAdmin, registerAdmin, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);
router.get("/me", protect, getMe);

module.exports = router;
