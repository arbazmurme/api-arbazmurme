const express = require("express");
const { getAllProjects, addProject, updateProject, deleteProject } = require("../controllers/projectController.js");

const projectRoutes = express.Router();

projectRoutes.get("/all", getAllProjects);
projectRoutes.post("/add", addProject);
projectRoutes.put("/:id", updateProject);
projectRoutes.delete("/:id", deleteProject);

module.exports = projectRoutes;
