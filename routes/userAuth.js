// ROUTES MODEL
const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  verifyToken,
  UpdateProfile,
} = require("../controllers/userAuth");
const AuthMiddleware = require("../middleware/authMiddleware");

router.post("/register", Register);
router.post("/login", Login);
router.get("/verifyToken", verifyToken);
router.put("/updateProfile", UpdateProfile);

module.exports = router;
