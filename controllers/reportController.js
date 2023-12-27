const { PrismaClient } = require("@prisma/client");
const getCommissionDetails = require("../utils/getCommissionDetails");
const getTopicDetails = require("../utils/getTopicDetails");
const { missingDetailsError, noCommissionError } = require("./errorConstants");
const prisma = new PrismaClient();

exports.postReport = async (req, res, next) => {
  const { commission_name, body_experience, body_improvement, topic_name } =
    req.body;

  try {
    if (
      !commission_name ||
      !body_experience ||
      !body_improvement ||
      !topic_name
    ) throw missingDetailsError
    const report = await prisma.reports.create({
      data: {
        commission_name,
        body_experience,
        body_improvement,
        topic_name,
      },
    });
    res.status(201).json({ report });
  } catch (err) {
    next(err);
  }
};

exports.selectReports = async (req, res, next) => {
  try {
    const reports = await prisma.reports.findMany();
    res.status(200).json({ reports });
  } catch (err) {
    console.log(err);
  }
};

exports.selectReportsByCommission = async (req, res, next) => {
  const { commission } = req.params;
  const { topic } = req.query;
  let query = {};
  if (topic) {
    query = {
      where: {
        commission_name: commission,
        topic_name: topic,
      },
    };
  } else {
    query = {
      where: {
        commission_name: commission,
      },
    };
  }

  try {
    const reports = await prisma.reports.findMany(query);

    if (reports.length === 0) {
      // Fetch commission details using selectCommissionByName function
      const commissionDetails = await getCommissionDetails(commission);
      if (topic) {
        const topicDetails = await getTopicDetails(topic);
        if (topicDetails.error && topic) {
          throw topicDetails.error;
        }
      }

      if (commissionDetails.error) {
        throw commissionDetails.error;
      }

      // Check if commission details are found but no reports exist
      return res.status(200).json({ reports: [] });
    }
    res.status(200).json({ reports });
  } catch (err) {
    next(err);
  }
};

exports.deleteReportsByCommission = async (req, res, next) => {
  const { commission } = req.body;
  try {
    if (!commission) throw missingDetailsError
    if (!isNaN(parseInt(commission))) {
      const error = new Error();
      error.status = 400;
      error.msg = "Incorrect Data Type";
      throw error;
    }
    const commissionDetails = await prisma.commission.findUnique({
      where: {
        commission: commission
      }
    })

    if(!commissionDetails) throw noCommissionError

    const reports = await prisma.reports.findMany({
      where: {
        commission_name: commission
      }
    })

    if(!reports.length){
      const error = new Error();
      error.status = 400;
      error.msg = "Commission has no reports";
      throw error;
    }

    const deletedData = await prisma.reports.deleteMany({
      where: {
        commission_name: commission
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err);
  }
};
