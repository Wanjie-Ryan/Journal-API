const express = require("express");
const router = express.Router();
const { getJournalSummary } = require("../controllers/summary");
const AuthMiddleware = require("../middleware/authMiddleware");

router.get("/journalSummary", AuthMiddleware, getJournalSummary);

module.exports = router;
