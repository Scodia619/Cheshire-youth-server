const { selectCommissionByName } = require("../controllers/commissionController");

const commissionRouter = require("express").Router();

commissionRouter.route("/:commission_name").get(selectCommissionByName)

module.exports = commissionRouter