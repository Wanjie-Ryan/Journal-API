const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const journalModel = require("../models/journal");
const { Op } = require("sequelize");

const getJournalSummary = async (req, res) => {
  try {
    const { period, startDate, endDate } = req.query;

    // Validate period
    if (!["daily", "weekly", "monthly"].includes(period)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid period specified" });
    }

    // Validate dates
    if (!startDate || !endDate) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Start date and end date are required" });
    }

    // Parse dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Ensure dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid date format" });
    }

    // Define the grouping period
    let groupBy;
    if (period === "daily") {
      groupBy = "day";
    } else if (period === "weekly") {
      groupBy = "week";
    } else if (period === "monthly") {
      groupBy = "month";
    }

    // Fetch and summarize journal entries
    const journals = await journalModel.findAll({
      attributes: [
        [sequelize.fn("date_trunc", groupBy, sequelize.col("date")), "period"],
        [sequelize.fn("COUNT", sequelize.col("id")), "entryCount"],
      ],
      where: {
        date: {
          [Op.between]: [start, end],
        },
      },
      group: ["period"],
      order: [["period", "ASC"]],
    });

    return res.status(StatusCodes.OK).json({ period, journals });
  } catch (err) {
    console.error("Error fetching journal summary:", err);
    if (err.name === "SequelizeUniqueConstraintError") {
        const errorMessage = err.errors.map((error) => error.message).join(", ");
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: errorMessage });
      }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, try again later" });
  }
};

module.exports = { getJournalSummary };
