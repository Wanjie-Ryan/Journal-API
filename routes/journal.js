// ROUTES MODEL
const express = require("express");
const router = express.Router();
const {
    createJournal, getAllJournals,getSingleJournal
} = require("../controllers/journal");
const AuthMiddleware = require("../middleware/authMiddleware");

router.post("/createjournal", AuthMiddleware, createJournal);
router.get("/getAllJournals", AuthMiddleware, getAllJournals);


module.exports = router;
