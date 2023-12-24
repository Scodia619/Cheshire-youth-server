const { getTopicsByCommission, postTopic } = require("../controllers/topicsController");

const topicsRouter = require("express").Router();

topicsRouter.route('/').post(postTopic)
topicsRouter.route('/:commission_name').get(getTopicsByCommission)

module.exports = topicsRouter