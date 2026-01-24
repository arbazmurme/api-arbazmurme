const mongoose = require("mongoose");

const ExperienceEducationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["experience", "education"],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    organization: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    duration: {
      type: String,
      required: true,
      // e.g. "July 2024 – Present"
    },

    descriptionPoints: [
      {
        type: String,
        trim: true,
      },
    ],

    grade: {
      type: String,
      // Only for education (e.g. CGPA / Percentage)
    },

    icon: {
      type: String,
      required: true,
      // Example values:
      // FaCode, FaBook, FaLaptop, FaGraduationCap
    },

    order: {
      type: Number,
      default: 0,
      // for timeline ordering
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ExperienceEducation",
  ExperienceEducationSchema
);
