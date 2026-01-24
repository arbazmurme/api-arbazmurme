import mongoose from "mongoose";

const SkillItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
      // example: "FaReact", "TbBrandNextjs"
    },
  },
  { _id: false }
);

const SkillsSchema = new mongoose.Schema(
  {
    frontend: {
      type: [SkillItemSchema],
      required: true,
    },
    backend: {
      type: [SkillItemSchema],
      required: true,
    },
    tools: {
      type: [SkillItemSchema],
      required: true,
    },
    other: {
      type: [SkillItemSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Skills", SkillsSchema);
