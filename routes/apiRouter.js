const commissionRouter = require("./commissionRouter");
const reportRouter = require("./reportRouter");

const apiRouter = require("express").Router();

apiRouter.use("/reports", reportRouter);
apiRouter.use("/commission", commissionRouter)
// apiRouter.use("/topics", topicRouter);

module.exports = apiRouter;