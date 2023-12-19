const reportRouter = require("./reportRouter");

const apiRouter = require("express").Router();

apiRouter.use("/reports", reportRouter);
// apiRouter.use("/topics", topicRouter);

module.exports = apiRouter;