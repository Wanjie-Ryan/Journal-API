const userModel = require("../models/users");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// CREATING THE REGISTRATION CONTROLLER, USER HAS CAN PASS IN THE username, email, and a password as the required fields
const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
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
    // console.log(user);

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

// CREATING THE LOGIN CONTROLLER WHERE THE USER CAN PASS IN THE EMAIL AND PASSWORD IN THE BODY, IT RETURNS A TOKEN IF THE LOGIN IS SUCCESSFUL

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Provide all the fields" });
    }

    const user = await userModel.findOne({ where: { email } });
    // console.log(user);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(StatusCodes.OK).json({ token });
    } else {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid credentials" });
    }
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
      .json({ message: "Something went wrong, try again later" });
  }
};

// UPDATING THE PROFILE OF THE USER, BOTH THE PASSWORD AND THE USERNAME
const UpdateProfile = async (req, res) => {
  try {
    const { username, password } = req.body;

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "You are not authorized to update profile" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;

    if (username || password) {
      const user = await userModel.findOne({ where: { id: userId } });
      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "User not found" });
      }

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      if (username) {
        user.username = username;
      }

      await user.save();

      return res
        .status(StatusCodes.OK)
        .json({ msg: "Profile updated successfully" });
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "No fields to update" });
    }
  } catch (err) {
    //   console.log(err);

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

// FOR PROTECTING ROUTES IN THE FRONTEND
const verifyToken = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const authHeader = req.headers.authorization;
      const token = authHeader.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.token = decoded;
      res.json({ type: "success" });
      // next()
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Token is bad" });
    }
  } catch (err) {
    // res.json({ type: 'error', message: 'Please authenticate', details: err })
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid token" });
  }
};

module.exports = { Register, Login, verifyToken, UpdateProfile };
