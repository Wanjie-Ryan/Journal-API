// ROUTES MODEL
const express = require("express");
const router = express.Router();
const {
    createJournal
} = require("../controllers/journal");
const AuthMiddleware = require("../middleware/authMiddleware");

router.post("/createjournal", AuthMiddleware, createJournal);


module.exports = router;
