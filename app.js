const express = require("express");
const { customErrors, prismaErrors } = require("./errors");
const apiRouter = require("./routes/apiRouter");
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

  app.use(customErrors)
  app.use(prismaErrors)

module.exports = app;
