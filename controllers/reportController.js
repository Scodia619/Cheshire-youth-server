const { PrismaClient } = require("@prisma/client");
const { selectCommissionByName } = require("./commissionController");
const prisma = new PrismaClient();

exports.postReport = async (req, res, next) => {
  const { commission_name, body_experience, body_improvement, topic_name } =
    req.body;

  if (
    !commission_name ||
    !body_experience ||
    !body_improvement ||
    !topic_name
  ) {
    return res
      .status(400)
      .json({
        msg: "Bad Request - Data Needed or Topic / Commission doesnt exist",
      });
  }

  try {
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
    try{
        const reports = await prisma.reports.findMany()
        res.status(200).json({reports})
    }catch(err){
        console.log(err)
    }
};

exports.selectReportsByCommission = async (req, res, next) => {
    const {commission} = req.params

    try{
      const reports = await prisma.reports.findMany({
        where: {
            commission_name: commission,
        },
    });

    if(reports.length === 0){
      const commissionDetails = await selectCommissionByName(req, res, next)
      console.log(commissionDetails)
      if (commissionDetails && commissionDetails.commission) {
        console.log("no data")
        return res.status(404).json({reports});
    } else if (commissionDetails.error) {
        console.log(commissionDetails.error);
        throw commissionDetails.error;
    }
    }
        res.status(200).send({reports})
    }catch(err){
        next(err)
    }
}