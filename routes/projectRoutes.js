const express = require("express");
const { getAllProjects, addProject } = require("../controllers/projectController.js");

const projectRoutes = express.Router();

projectRoutes.get("/all", getAllProjects);
projectRoutes.post("/add", addProject);

module.exports = projectRoutes;
