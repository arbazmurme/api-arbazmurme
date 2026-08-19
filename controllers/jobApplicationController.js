const JobApplication = require("../models/JobApplication");

/* =========================
   CREATE Job Application
========================= */
exports.createJobApplication = async (req, res) => {
  try {
    const {
      sNo,
      companyName,
      rolePosition,
      platform,
      dateApplied,
      status,
      responseFeedback,
      interviewRoundQuestions,
      whereIGotStuck,
      actionItems,
      usefulLinksNotes,
    } = req.body;

    if (!companyName || !rolePosition) {
      return res.status(400).json({
        success: false,
        message: "Company Name and Role/Position are required fields",
      });
    }

    // Auto-calculate sNo if not provided
    let serialNumber = sNo;
    if (!serialNumber) {
      const count = await JobApplication.countDocuments();
      serialNumber = count + 1;
    }

    const jobApp = await JobApplication.create({
      sNo: serialNumber,
      companyName,
      rolePosition,
      platform,
      dateApplied: dateApplied || Date.now(),
      status: status || "Applied",
      responseFeedback,
      interviewRoundQuestions,
      whereIGotStuck,
      actionItems,
      usefulLinksNotes,
    });

    res.status(201).json({
      success: true,
      message: "Job Application created successfully",
      data: jobApp,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET ALL Job Applications
========================= */
exports.getAllJobApplications = async (req, res) => {
  try {
    const jobApps = await JobApplication.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobApps.length,
      data: jobApps,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   GET SINGLE Job Application
========================= */
exports.getSingleJobApplication = async (req, res) => {
  try {
    const jobApp = await JobApplication.findById(req.params.id);

    if (!jobApp) {
      return res.status(404).json({
        success: false,
        message: "Job Application not found",
      });
    }

    res.status(200).json({
      success: true,
      data: jobApp,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   UPDATE Job Application
========================= */
exports.updateJobApplication = async (req, res) => {
  try {
    const jobApp = await JobApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!jobApp) {
      return res.status(404).json({
        success: false,
        message: "Job Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job Application updated successfully",
      data: jobApp,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   DELETE Job Application
========================= */
exports.deleteJobApplication = async (req, res) => {
  try {
    const jobApp = await JobApplication.findById(req.params.id);

    if (!jobApp) {
      return res.status(404).json({
        success: false,
        message: "Job Application not found",
      });
    }

    await jobApp.deleteOne();

    res.status(200).json({
      success: true,
      message: "Job Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
