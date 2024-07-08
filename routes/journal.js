// ROUTES MODEL
const express = require("express");
const router = express.Router();
const {
  createJournal,
  getAllJournals,
  getSingleJournal,
  updateJournal,
  deleteJournal,
  getJournalsByCategory,
} = require("../controllers/journal");
const AuthMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Journals
 *   description: API to manage journals
 */

/**
 * @swagger
 * /api/v1/createjournal:
 *   post:
 *     summary: Create a new journal
 *     tags: [Journals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Journal'
 *     responses:
 *       201:
 *         description: The journal was successfully created.
 */
router.post("/createjournal", AuthMiddleware, createJournal);

/**
 * @swagger
 * /api/v1/getAllJournals:
 *   get:
 *     summary: Retrieve a list of journals
 *     tags: [Journals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of journals.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Journal'
 */
router.get("/getAllJournals", AuthMiddleware, getAllJournals);

/**
 * @swagger
 * /api/v1/getSingleJournal/{id}:
 *   get:
 *     summary: Retrieve a single journal by ID
 *     tags: [Journals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The journal ID
 *     responses:
 *       200:
 *         description: A journal object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Journal'
 */
router.get("/getSingleJournal/:id", AuthMiddleware, getSingleJournal);

/**
 * @swagger
 * /api/v1/updateJournal/{id}:
 *   put:
 *     summary: Update a journal by ID
 *     tags: [Journals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The journal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Journal'
 *     responses:
 *       200:
 *         description: The journal was successfully updated.
 */
router.put("/updateJournal/:id", AuthMiddleware, updateJournal);

/**
 * @swagger
 * /api/v1/deleteJournal/{id}:
 *   delete:
 *     summary: Delete a journal by ID
 *     tags: [Journals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The journal ID
 *     responses:
 *       200:
 *         description: The journal was successfully deleted.
 */
router.delete("/deleteJournal/:id", AuthMiddleware, deleteJournal);

/**
 * @swagger
 * /api/v1/categoryJournals:
 *   get:
 *     summary: Retrieve journals by category
 *     tags: [Journals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: The journal category
 *     responses:
 *       200:
 *         description: A list of journals by category.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Journal'
 */
router.get("/categoryJournals", AuthMiddleware, getJournalsByCategory);

module.exports = router;
