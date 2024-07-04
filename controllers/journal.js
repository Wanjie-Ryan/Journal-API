const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const journalModel = require("../models/journal");

const createJournal = async (req, res) => {
  try {
    const { title, content, category, date } = req.body;

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "You are not authorized to create a journal" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    if (!title || !content || !category || !date) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "All fields are required" });
    }

    const journalEntry = await journalModel.create({
      title,
      content,
      category,
      date,
      userId,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Journal Created Successfully", journalEntry });
  } catch (err) {
    // console.error("Error creating journal:", err);

    if (err.name === "SequelizeUniqueConstraintError") {
      const errorMessage = err.errors.map((error) => error.message).join(", ");
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: errorMessage });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

//  A METHOD TO GET ALL JOURNALS

const getAllJournals = async (req, res) => {
  try {
    const Journals = await journalModel.findAll();

    if (Journals.length > 0) {
      return res.status(StatusCodes.OK).json({ msg: "All Journals", Journals });
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No journals found" });
    }
  } catch (err) {
    //   console.error("Error retrieving journals:", err);

    if (err.name === "SequelizeUniqueConstraintError") {
      const errorMessage = err.errors.map((error) => error.message).join(", ");
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: errorMessage });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

//  A METHOD TO GET JOURNAL BY ID, GETTING A SINGLE JOURNAL

const getSingleJournal = async (req, res) => {
  try {
    const { id: journalId } = req.params;

    const journal = await journalModel.findByPk(journalId);

    if (!journal) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Journal not found" });
    }

    return res.status(StatusCodes.OK).json({ msg: "Single Journal", journal });
  } catch (err) {
    // console.log(err);
    if (err.name === "SequelizeUniqueConstraintError") {
      const errorMessage = err.errors.map((error) => error.message).join(", ");
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: errorMessage });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

const updateJournal = async (req, res) => {
  try {
    const { id: journalId } = req.params;
    const { title, content, category, date } = req.body;

    // Find the journal entry by its ID
    const journal = await journalModel.findByPk(journalId);

    // If journal is not found
    if (!journal) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Journal not found" });
    }

    // Update journal entry with new values if provided
    if (title) {
      journal.title = title;
    }
    if (content) {
      journal.content = content;
    }
    if (category) {
      journal.category = category;
    }
    if (date) {
      journal.date = date;
    }
    // Save the updated journal entry
    await journal.save();

    return res
      .status(StatusCodes.OK)
      .json({ message: "Journal updated successfully", journal });
  } catch (err) {
    // console.error("Error updating journal:", err);

    if (err.name === "SequelizeUniqueConstraintError") {
      const errorMessage = err.errors.map((error) => error.message).join(", ");
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: errorMessage });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

const deleteJournal = async (req, res) => {
  try {
    const { id: journalId } = req.params;

    const journal = await journalModel.findByPk(journalId);

    if (!journal) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Journal not found" });
    }

    await journal.destroy();

    return res
      .status(StatusCodes.OK)
      .json({ message: "Journal deleted successfully" });
  } catch (err) {
    // console.log(err)
    if (err.name === "SequelizeUniqueConstraintError") {
      const errorMessage = err.errors.map((error) => error.message).join(", ");
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: errorMessage });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

// Retrieve journals filtered by category
const getJournalsByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Category parameter is required for filtering" });
    }

    const Journals = await journalModel.findAll({
      where: {
        category: category.toLowerCase(), // Ensure case-insensitive comparison
      },
    });

    if (Journals.length > 0) {
      return res
        .status(StatusCodes.OK)
        .json({ msg: `Journals filtered by category: ${category}`, Journals });
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No journals found with category: ${category}` });
    }
  } catch (err) {
    //   console.error("Error retrieving filtered journals:", err);

    if (err.name === "SequelizeUniqueConstraintError") {
      const errorMessage = err.errors.map((error) => error.message).join(", ");
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: errorMessage });
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

module.exports = {
  createJournal,
  getAllJournals,
  getSingleJournal,
  updateJournal,
  deleteJournal,
  getJournalsByCategory,
};
