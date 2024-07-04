const { StatusCodes } = require("http-status-codes");
const { Op, fn, col, literal } = require("sequelize");
const journalModel = require("../models/journal");

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
      groupBy = literal("DATE(date)");
    } else if (period === "weekly") {
      groupBy = literal("YEARWEEK(date, 1)");
    } else if (period === "monthly") {
      groupBy = literal("MONTH(date)");
    }

    // Fetch and summarize journal entries
    const journals = await journalModel.findAll({
      attributes: [
        [groupBy, "period"],
        [fn("COUNT", col("id")), "entryCount"],
        [fn("GROUP_CONCAT", col("title")), "titles"], // Concatenate titles into a single string
      ],
      where: {
        date: {
          [Op.between]: [start, end],
        },
      },
      group: ["period"],
      order: [[literal("period"), "ASC"]],
    });

    // Convert the result to JSON format and send the response
    return res.status(StatusCodes.OK).json({ period, journals });
  } catch (err) {
    // console.error("Error fetching journal summary:", err);
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
