const mongoose = require("mongoose");

// Company Contact Person Sub-schema
const ContactPersonSchema = new mongoose.Schema({
  name: { type: String, trim: true, default: "" },
  email: { type: String, trim: true, lowercase: true, default: "" },
  phone: { type: String, trim: true, default: "" },
  designation: { type: String, trim: true, default: "" },
});

// Interview Round Sub-schema
const InterviewRoundSchema = new mongoose.Schema({
  roundName: { type: String, trim: true, default: "Technical Round" },
  roundDate: { type: Date },
  status: {
    type: String,
    enum: ["Scheduled", "Passed", "Failed", "Pending", "Cancelled"],
    default: "Pending",
  },
  interviewerName: { type: String, trim: true, default: "" },
  questions: [{ type: String, trim: true }],
  whereIGotStuck: { type: String, trim: true, default: "" },
  feedback: { type: String, trim: true, default: "" },
});

// Response / Feedback History Sub-schema
const ResponseFeedbackSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  responseType: { type: String, trim: true, default: "Email" },
  status: { type: String, trim: true, default: "" },
  notes: { type: String, trim: true, default: "" },
});

// Where I Got Stuck Sub-schema
const GotStuckItemSchema = new mongoose.Schema({
  topic: { type: String, trim: true, default: "" },
  description: { type: String, trim: true, default: "" },
});

// Action Items Sub-schema
const ActionItemSchema = new mongoose.Schema({
  task: { type: String, trim: true, default: "" },
  isCompleted: { type: Boolean, default: false },
});

// Useful Links Sub-schema
const UsefulLinkSchema = new mongoose.Schema({
  title: { type: String, trim: true, default: "" },
  url: { type: String, trim: true, default: "" },
  note: { type: String, trim: true, default: "" },
});

// Main Job Application Schema
const JobApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
    },
    userEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },
    sNo: {
      type: Number,
    },
    companyName: {
      type: String,
      required: [true, "Company Name is required"],
      trim: true,
    },
    rolePosition: {
      type: String,
      required: [true, "Role/Position is required"],
      trim: true,
    },
    jobLocation: {
      type: String,
      trim: true,
      default: "Remote",
    },
    salaryPackage: {
      type: String,
      trim: true,
      default: "",
    },
    platform: {
      type: String,
      trim: true,
      default: "LinkedIn",
    },
    dateApplied: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: [
        "Applied",
        "Screening",
        "Interviewing",
        "Offer",
        "Rejected",
        "On Hold",
        "No Response",
      ],
      default: "Applied",
      trim: true,
    },

    // Array fields for multiple items per application
    companyContacts: [ContactPersonSchema],
    interviewRounds: [InterviewRoundSchema],
    responseFeedback: [ResponseFeedbackSchema],
    whereIGotStuck: [GotStuckItemSchema],
    actionItems: [ActionItemSchema],
    usefulLinksNotes: [UsefulLinkSchema],
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("JobApplication", JobApplicationSchema);
