const express = require("express");
const router = express.Router();
const { getJournalSummary } = require("../controllers/summary");
const AuthMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Summary
 *   description: Endpoint for getting the summary of journals based on the period given by the user, authenticated route.
 */

/**
 * @swagger
 * /api/summary/journalSummary:
 *   get:
 *     summary: Get summary of journals
 *     tags: [Summary]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with journal summary data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 period:
 *                   type: string
 *                   description: The period for which the summary is calculated (e.g., weekly).
 *                 journals:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       period:
 *                         type: number
 *                         description: The specific period identifier.
 *                       entryCount:
 *                         type: integer
 *                         description: Number of journal entries in the period.
 *                       titles:
 *                         type: string
 *                         description: Comma-separated list of journal titles.
 *                   description: List of summaries for each period.
 *               example:
 *                 period: "weekly"
 *                 journals:
 *                   - period: 202215
 *                     entryCount: 3
 *                     titles: "first journal,second journal,first journal"
 */
router.get("/journalSummary", AuthMiddleware, getJournalSummary);

module.exports = router;
