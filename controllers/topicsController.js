const { PrismaClient } = require("@prisma/client");
const getCommissionDetails = require("../utils/getCommissionDetails");
const prisma = new PrismaClient();

exports.getTopicsByCommission = async (req, res, next) => {
  const { commission_name } = req.params;

  try {
    const commission = await getCommissionDetails(commission_name);

    const parsedId = parseInt(commission.commission_id);

    const topics = await prisma.commissionTopics.findMany({
      where: {
        commissionId: parsedId,
      },
      include: {
        topic: true,
      },
    });

    res.status(200).send({ topics });
  } catch (err) {
    next(err);
  }
};

exports.postTopic = async (req, res, next) => {
  const { topic_name, topic_description } = req.body;

  try {
    if (!topic_name || !topic_description) {
      const error = new Error();
      error.status = 400;
      error.msg = "Missing data";
      throw error;
    }

    if (
      typeof topic_name !== "string" ||
      typeof topic_description !== "string"
    ) {
      const error = new Error();
      error.status = 400;
      error.msg = "Invalid Data Type";
      throw error;
    }

    const topic = await prisma.topic.create({
      data: { topic: topic_name, topic_description: topic_description },
    });

    res.status(201).send({ topic });
  } catch (err) {
    next(err);
  }
};

exports.getAllTopics = async (req, res, next) => {
  try {
    const topics = await prisma.topic.findMany();
    res.status(200).send({ topics });
  } catch (err) {
    next(err);
  }
};

exports.linkTopic = async (req, res, next) => {
  const { topicId, commission } = req.body;
  try {
    if (!topicId || !commission) {
      const error = new Error();
      error.status = 400;
      error.msg = "Missing Data";
      throw error;
    }
    
    const commissionData = await prisma.commission.findUnique({
      where: {
        commission: commission,
      },
    });

    const topicCheck = await prisma.commissionTopics.findUnique({
      where: {
        topicId_commissionId: {
            topicId: topicId, // Replace with the actual topicId
            commissionId: commissionData.commission_id, // Replace with the actual commissionId
          },
      },
    });

    if (topicCheck) {
      const error = new Error();
      error.status = 400;
      error.msg = "Topic already linked";
      throw error;
    }

    const link = await prisma.commissionTopics.create({
      data: { topicId: topicId, commissionId: commissionData.commission_id},
    });

    res.status(201).send({ link });
  } catch (err) {
    next(err);
  }
};
