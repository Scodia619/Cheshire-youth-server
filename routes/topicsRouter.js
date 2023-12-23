const { getTopicsByCommission } = require("../controllers/topicsController");

const topicsRouter = require("express").Router();

topicsRouter.route('/:commission_name').get(getTopicsByCommission)

module.exports = topicsRouter