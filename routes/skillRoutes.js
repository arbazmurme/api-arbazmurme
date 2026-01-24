const express = require("express");
const {
  getSkills,
  createSkills,
  updateSkills,
  addSkillItem,
  editSkillItem,
  deleteSkillItem,
} = require("../controllers/skillController");

const router = express.Router();

// public
router.get("/", getSkills);

// admin
// PUBLIC
router.get("/", getSkills);

// ADMIN (custom actions FIRST)
router.post("/add", addSkillItem);
router.put("/edit", editSkillItem);
router.delete("/delete", deleteSkillItem);

// GENERIC (LAST)
router.post("/", createSkills);
router.put("/:id", updateSkills);

module.exports = router;
