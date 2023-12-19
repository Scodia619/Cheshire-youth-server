const { postReport, selectReports, selectReportsByCommission } = require("../controllers/reportController");

const reportRouter = require("express").Router();

reportRouter.route("/").post(postReport).get(selectReports)
reportRouter.route("/:commission").get(selectReportsByCommission)

module.exports = reportRouter