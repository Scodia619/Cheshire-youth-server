const { selectCommissionByName, selectAllCommissions, getCommissionByUser, postCommission } = require("../controllers/commissionController");

const commissionRouter = require("express").Router();

commissionRouter.route('/').get(selectAllCommissions).post(postCommission)
commissionRouter.route("/user/:user_id").get(getCommissionByUser)
commissionRouter.route("/:commission").get(selectCommissionByName)

module.exports = commissionRouter