const { postReport, selectReports } = require("../controllers/reportController");

const reportRouter = require("express").Router();

reportRouter.route("/").post(postReport).get(selectReports)

module.exports = reportRouter