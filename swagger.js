const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Journal API",
      version: "1.0.0",
      description:
        "A simple API to manage journals, it includes the CRUD operations, the Filter by category function and the filter by period function.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/journal.js", "./routes/summary.js", "./routes/userAuth.js"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
