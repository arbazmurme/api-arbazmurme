const express = require("express");
const router = express.Router();

const {
  createContact,
  getAllContacts,
  getSingleContact,
  markAsRead,
  markAsReplied,
  deleteContact,
} = require("../controllers/contactController");

/* =========================
   PUBLIC ROUTE
========================= */

// Contact form submit
router.post("/add", createContact);

/* =========================
   ADMIN ROUTES
   (protect with auth middleware if needed)
========================= */

// Get all contacts (admin inbox)
router.get("/", getAllContacts);

// Get single contact
router.get("/:id", getSingleContact);

// Mark as read
router.put("/read/:id", markAsRead);

// Mark as replied
router.put("/replied/:id", markAsReplied);

// Delete contact
router.delete("/delete/:id", deleteContact);

module.exports = router;
