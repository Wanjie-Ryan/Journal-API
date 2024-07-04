//JOURNALS MODEL WITH CHECKS AND AN ASSOCIATION BETWEEN THE USERID FOREIGN KEY AND THE PRIMARY KEY IN THE USER MODEL
const { DataTypes } = require("sequelize");
const sequelize = require("../connection/connection");
const User = require("./users");

const Journal = sequelize.define(
  "journalentry",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title is required",
        },
        notEmpty: {
          msg: "Title cannot be empty",
        },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Content is required",
        },
        notEmpty: {
          msg: "Content cannot be empty",
        },
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Category is required",
        },
        notEmpty: {
          msg: "Category cannot be empty",
        },
        isIn: {
          args: [["Personal", "Work", "Travel"]],
          msg: "Category must be one of the following: personal, work, travel",
        },
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Date is required",
        },
        isDate: {
          msg: "Must be a valid date",
        },
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: {
          msg: "User ID is required",
        },
        isUUID: {
          args: 4,
          msg: "Must be a valid UUID",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

Journal.belongsTo(User, { foreignKey: "userId" });

module.exports = Journal;
