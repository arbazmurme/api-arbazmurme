const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  techs: [{ type: String, required: true }],
  description: { type: String, required: true },
  link: { type: String },
  gitLink: { type: String },
  liveDemo: { type: String },
  imageSrc: { type: String, required: true },
  imageAlt: { type: String },
  isLeft: { type: Boolean, default: false },
});

module.exports = mongoose.model("Project", projectSchema);