const { PrismaClient } = require("@prisma/client");
const {getCommissionDetails} = require("./utils");
const { missingDetailsError, incorrectDataError } = require("./errorConstants");
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
    if (!topic_name || !topic_description) throw missingDetailsError;

    if (!isNaN(parseInt(topic_name)) || !isNaN(parseInt(topic_description)))
      throw incorrectDataError;

    const topicDetails = await prisma.topic.findUnique({
      where: {
        topic: topic_name,
      },
    });

    if (topicDetails) {
      const error = new Error();
      error.status = 400;
      error.msg = "Topic already exists";
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
  const { topic, commission } = req.body;
  try {
    if (!topic || !commission) throw missingDetailsError

    const commissionData = await prisma.commission.findUnique({
      where: {
        commission: commission,
      },
    });

    const topicData = await prisma.topic.findUnique({
      where: {
        topic: topic,
      },
    });

    const topicCheck = await prisma.commissionTopics.findUnique({
      where: {
        topicId_commissionId: {
          topicId: topicData.topic_id, // Replace with the actual topicId
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
      data: {
        topicId: topicData.topic_id,
        commissionId: commissionData.commission_id,
      },
    });

    res.status(201).send({ link });
  } catch (err) {
    next(err);
  }
};

exports.deleteTopicLink = async (req, res, next) => {
  try {
    const { commission, topic } = req.body;

    if (!commission || !topic) throw missingDetailsError
    if (!isNaN(parseInt(commission)) || !isNaN(parseInt(topic))) throw incorrectDataError
    const commissionData = await prisma.commission.findUnique({
      where: {
        commission: commission,
      },
    });
    const topicData = await prisma.topic.findUnique({
      where: {
        topic: topic,
      },
    });

    const link = await prisma.commissionTopics.findUnique({
      where: {
        topicId_commissionId: {
          topicId: topicData.topic_id, // Replace with the actual topicId
          commissionId: commissionData.commission_id, // Replace with the actual commissionId
        },
      },
    });

    if (!link) {
      const error = new Error();
      error.status = 400;
      error.msg = "Commission not linked with topic";
      throw error;
    }

    const deleteData = await prisma.commissionTopics.delete({
      where: {
        topicId_commissionId: {
          topicId: topicData.topic_id, // Replace with the actual topicId
          commissionId: commissionData.commission_id, // Replace with the actual commissionId
        },
      },
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
