const { postReport, selectReports, selectReportsByCommission, deleteReportsByCommission } = require("../controllers/reportController");

const reportRouter = require("express").Router();

reportRouter.route("/").post(postReport).get(selectReports)
reportRouter.route('/delete').delete(deleteReportsByCommission)
reportRouter.route("/:commission").get(selectReportsByCommission)

module.exports = reportRouter