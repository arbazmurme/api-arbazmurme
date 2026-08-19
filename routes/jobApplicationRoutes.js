const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  createJobApplication,
  getAllJobApplications,
  getSingleJobApplication,
  updateJobApplication,
  deleteJobApplication,
} = require("../controllers/jobApplicationController");

// Protect all job application routes with JWT Token authentication
router.use(protect);

// Get all applications (user-specific with pagination) & Add new application
router.route("/").get(getAllJobApplications).post(createJobApplication);

// Get single application, Update application, Delete application
router
  .route("/:id")
  .get(getSingleJobApplication)
  .put(updateJobApplication)
  .delete(deleteJobApplication);

module.exports = router;
