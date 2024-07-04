const userModel = require("../models/users");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// CREATING THE REGISTRATION CONTROLLER, USER HAS CAN PASS IN THE username, email, and a password as the required fields
const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if ((!username, !email, !password)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log(user);

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User created successfully" });
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
      .json({ message: "Something went wrong, try again later" });
  }
};

const Login = async (req, res) => {};

module.exports = { Register, Login };
