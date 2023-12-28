const { getAllEndpoints } = require("../controllers/apiController");
const commissionRouter = require("./commissionRouter");
const reportRouter = require("./reportRouter");
const topicsRouter = require("./topicsRouter");
const usersRouter = require("./userRouter");

const apiRouter = require("express").Router();

apiRouter.use("/reports", reportRouter);
apiRouter.use("/commission", commissionRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use("/topics", topicsRouter);
apiRouter.route('/').get(getAllEndpoints)

module.exports = apiRouter;