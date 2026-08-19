const JobApplication = require("../models/JobApplication");

// Helper to filter out empty draft objects from arrays
const sanitizeApplicationData = (data) => {
  const cleanData = { ...data };

  if (Array.isArray(cleanData.companyContacts)) {
    cleanData.companyContacts = cleanData.companyContacts.filter(
      (c) => (c.name && c.name.trim()) || (c.email && c.email.trim()) || (c.phone && c.phone.trim()) || (c.designation && c.designation.trim())
    );
  }

  if (Array.isArray(cleanData.interviewRounds)) {
    cleanData.interviewRounds = cleanData.interviewRounds.filter(
      (r) => (r.roundName && r.roundName.trim()) || (r.interviewerName && r.interviewerName.trim()) || (r.feedback && r.feedback.trim()) || (r.whereIGotStuck && r.whereIGotStuck.trim()) || (r.questions && r.questions.some((q) => q && q.trim()))
    );
  }

  if (Array.isArray(cleanData.responseFeedback)) {
    cleanData.responseFeedback = cleanData.responseFeedback.filter(
      (f) => (f.status && f.status.trim()) || (f.notes && f.notes.trim())
    );
  }

  if (Array.isArray(cleanData.whereIGotStuck)) {
    cleanData.whereIGotStuck = cleanData.whereIGotStuck.filter(
      (s) => (s.topic && s.topic.trim()) || (s.description && s.description.trim())
    );
  }

  if (Array.isArray(cleanData.actionItems)) {
    cleanData.actionItems = cleanData.actionItems.filter(
      (a) => a.task && a.task.trim() !== ""
    );
  }

  if (Array.isArray(cleanData.usefulLinksNotes)) {
    cleanData.usefulLinksNotes = cleanData.usefulLinksNotes.filter(
      (l) => (l.title && l.title.trim()) || (l.url && l.url.trim()) || (l.note && l.note.trim())
    );
  }

  return cleanData;
};

/* =========================
   CREATE Job Application
========================= */
exports.createJobApplication = async (req, res) => {
  try {
    const { companyName, rolePosition, sNo } = req.body;

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

    const cleanData = sanitizeApplicationData(req.body);

    const jobApp = await JobApplication.create({
      ...cleanData,
      sNo: serialNumber,
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
    const cleanData = sanitizeApplicationData(req.body);

    const jobApp = await JobApplication.findByIdAndUpdate(
      req.params.id,
      cleanData,
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
