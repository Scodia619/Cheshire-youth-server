const commissionRouter = require("./commissionRouter");
const reportRouter = require("./reportRouter");
const usersRouter = require("./userRouter");

const apiRouter = require("express").Router();

apiRouter.use("/reports", reportRouter);
apiRouter.use("/commission", commissionRouter)
apiRouter.use('/users', usersRouter)
// apiRouter.use("/topics", topicRouter);

module.exports = apiRouter;