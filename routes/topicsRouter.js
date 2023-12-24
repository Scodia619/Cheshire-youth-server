const { getTopicsByCommission, postTopic, getAllTopics, linkTopic } = require("../controllers/topicsController");

const topicsRouter = require("express").Router();

topicsRouter.route('/').post(postTopic).get(getAllTopics)
topicsRouter.route('/link').post(linkTopic)
topicsRouter.route('/:commission_name').get(getTopicsByCommission)

module.exports = topicsRouter