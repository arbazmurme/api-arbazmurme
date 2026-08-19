const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema(
  {
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
    companyEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    companyContact: {
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
    responseFeedback: {
      type: String,
      trim: true,
      default: "",
    },
    interviewRoundQuestions: {
      type: String,
      trim: true,
      default: "",
    },
    whereIGotStuck: {
      type: String,
      trim: true,
      default: "",
    },
    actionItems: {
      type: String,
      trim: true,
      default: "",
    },
    usefulLinksNotes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("JobApplication", JobApplicationSchema);
