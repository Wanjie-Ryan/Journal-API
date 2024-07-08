const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  verifyToken,
  UpdateProfile,
} = require("../controllers/userAuth");
const AuthMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication operations, and updating user details
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: john_doe
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: User successfully registered.
 */

router.post("/register", Register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with existing credentials
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: User logged in successfully.
 */

router.post("/login", Login);

/**
 * @swagger
 * /api/auth/verifyToken:
 *   get:
 *     summary: Verify user authentication token
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid.
 *       401:
 *         description: Unauthorized, token invalid or expired.
 */

router.get("/verifyToken", verifyToken);

/**
 * @swagger
 * /api/auth/updateProfile:
 *   put:
 *     summary: Update user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               username: new_username
 *               email: new_email@example.com
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *       401:
 *         description: Unauthorized, token invalid or expired.
 */

router.put("/updateProfile", AuthMiddleware, UpdateProfile);

module.exports = router;
