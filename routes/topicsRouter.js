const { getTopicsByCommission, postTopic, getAllTopics } = require("../controllers/topicsController");

const topicsRouter = require("express").Router();

topicsRouter.route('/').post(postTopic).get(getAllTopics)
topicsRouter.route('/:commission_name').get(getTopicsByCommission)

module.exports = topicsRouter