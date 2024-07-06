require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3005;
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const cookie = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const sequelize = require("./connection/connection");
const { StatusCodes } = require("http-status-codes");
const userRoutes = require("./routes/userAuth");
const journalRoutes = require("./routes/journal");
const SummaryjournalRoutes = require("./routes/summary");
const { swaggerUi, specs } = require("./swagger");
const app = express();

// END OF IMPORTS

app.use(bodyParser.json());
app.use(helmet());
app.use(xss());
app.use(cookie());
app.use(express.json());
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowsMs: 15 * 60 * 100,
    max: 100,
  })
);
app.use(cors());

// ROUTES INITIALIZATION

app.use("/api/auth", userRoutes);
app.use("/api/v1", journalRoutes);
app.use("/api/summary", SummaryjournalRoutes);

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// SERVER START-UP

sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
    app.listen(port, () => {
      console.log(`server is running on port, ${port}`);
    });
  })
  .catch((err) => console.error("Unable to connect to the database:", err));
