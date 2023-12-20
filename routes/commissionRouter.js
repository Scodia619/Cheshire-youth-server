const { selectCommissionByName } = require("../controllers/commissionController");

const commissionRouter = require("express").Router();

commissionRouter.route("/:commission").get(selectCommissionByName)

module.exports = commissionRouter