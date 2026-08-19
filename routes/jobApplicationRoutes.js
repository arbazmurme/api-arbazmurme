const express = require("express");
const router = express.Router();

const {
  createJobApplication,
  getAllJobApplications,
  getSingleJobApplication,
  updateJobApplication,
  deleteJobApplication,
} = require("../controllers/jobApplicationController");

// Get all applications & Add new application
router.route("/").get(getAllJobApplications).post(createJobApplication);

// Get single application, Update application, Delete application
router
  .route("/:id")
  .get(getSingleJobApplication)
  .put(updateJobApplication)
  .delete(deleteJobApplication);

module.exports = router;
