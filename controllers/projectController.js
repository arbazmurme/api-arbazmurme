const Project = require("../models/Project");

// GET all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ date: -1 });
    res.status(200).json(projects);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch projects", error: err.message });
  }
};

// POST (optional: for adding projects manually)
const addProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create project", error: err.message });
  }
};

const updateProject = async (req, res) => {
  const projectId = req.params.id;
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      req.body,
      { new: true },
    );
    res.status(200).json(updatedProject);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update project", error: err.message });
  }
};

const deleteProject = async (req, res) => {
  const projectId = req.params.id;
  try {
    await Project.findByIdAndDelete(projectId);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete project", error: err.message });
  }
};

// Export as an object (CommonJS style)
module.exports = {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject
};
