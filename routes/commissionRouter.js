const { selectCommissionByName, selectAllCommissions, getCommissionByUser, postCommission, linkUserToCommission } = require("../controllers/commissionController");

const commissionRouter = require("express").Router();

commissionRouter.route('/').get(selectAllCommissions).post(postCommission)
commissionRouter.route('/add-user').post(linkUserToCommission)
commissionRouter.route("/user/:user_id").get(getCommissionByUser)
commissionRouter.route("/:commission").get(selectCommissionByName)

module.exports = commissionRouter