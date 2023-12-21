const { selectCommissionByName, selectAllCommissions } = require("../controllers/commissionController");

const commissionRouter = require("express").Router();

commissionRouter.route('/').get(selectAllCommissions)
commissionRouter.route("/:commission").get(selectCommissionByName)

module.exports = commissionRouter