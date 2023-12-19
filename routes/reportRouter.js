const { postArticle } = require("../controllers/reportController");

const reportRouter = require("express").Router();

reportRouter.route("/").post(postArticle)

module.exports = reportRouter