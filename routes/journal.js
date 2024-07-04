// ROUTES MODEL
const express = require("express");
const router = express.Router();
const {
  createJournal,
  getAllJournals,
  getSingleJournal,
  updateJournal,
  deleteJournal,
} = require("../controllers/journal");
const AuthMiddleware = require("../middleware/authMiddleware");

router.post("/createjournal", AuthMiddleware, createJournal);
router.get("/getAllJournals", AuthMiddleware, getAllJournals);
router.get("/getSingleJournal/:id", AuthMiddleware, getSingleJournal);
router.put("/updateJournal/:id", AuthMiddleware, updateJournal);
router.delete("/deleteJournal/:id", AuthMiddleware, deleteJournal);

module.exports = router;
