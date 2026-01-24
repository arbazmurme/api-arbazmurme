const express = require("express");
const router = express.Router();

const {
  createItem,
  getAllItems,
  getSingleItem,
  updateItem,
  deleteItem,
} = require("../controllers/experienceEducationController");

// CREATE
router.post("/add", createItem);

// READ
router.get("/", getAllItems);
router.get("/:id", getSingleItem);

// UPDATE
router.put("/update/:id", updateItem);

// DELETE
router.delete("/delete/:id", deleteItem);

module.exports = router;
