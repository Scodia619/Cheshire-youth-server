const { PrismaClient } = require("@prisma/client");
const {
  missingDetailsError,
  noCommissionError,
  incorrectDataError,
  noUserError,
  commissionExistsError,
  userLinkedError,
} = require("./errorConstants");
const { getCommissionDetails, getAllUsers } = require("./utils");
const prisma = new PrismaClient();

//Reject on Not Found Error
exports.selectCommissionByName = async (req, res, next) => {
  const { commission } = req.params;
  try {
    if (!isNaN(parseInt(commission))) throw incorrectDataError;

    const commissionData = await getCommissionDetails(commission);
    if (commissionData.error) throw commissionData.error;
    res.status(200).json({ commission: commissionData });
  } catch (err) {
    next(err);
  }
};

exports.selectAllCommissions = async (req, res, next) => {
  try {
    const commissions = await prisma.commission.findMany();
    res.status(200).send({ commissions });
  } catch (err) {
    next();
  }
};

exports.getCommissionByUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const parsedId = parseInt(user_id);

    if (isNaN(parsedId)) throw incorrectDataError;

    const commissions = await prisma.commissionUser.findMany({
      where: {
        userId: parsedId, // Use the specific user's ID here
      },
      include: {
        commission: true, // Include the commission details
      },
    });

    res.status(200).send({ commissions });
  } catch (err) {
    next(err);
  }
};

exports.postCommission = async (req, res, next) => {
  try {
    const { commission, commission_image } = req.body;
    if (!commission || !commission_image) throw missingDetailsError;

    if (!isNaN(parseInt(commission)) || !isNaN(parseInt(commission_image)))
      throw incorrectDataError;

    const commissionsData = await prisma.commission.findUnique({where: {
        commission: commission
    }
    });

    if (commissionsData) throw commissionExistsError;

    const newCommission = await prisma.commission.create({
      data: {
        commission: commission,
        commission_image: commission_image,
      },
    });

    res.status(201).send({ commission: newCommission });
  } catch (err) {
    next(err);
  }
};

exports.linkUserToCommission = async (req, res, next) => {
  const { commission, username } = req.body;
  try {
    if (!commission || !username) throw missingDetailsError;

    if (!isNaN(parseInt(commission)) || !isNaN(parseInt(username)))
      throw incorrectDataError;
    const commissionData = await getCommissionDetails(commission);

    if (commissionData.error) throw commissionData.error;

    const user = getAllUsers(username);

    if (user.error) throw user.error;

    const link = await prisma.commissionUser.findUnique({
      where: {
        userId_commissionId: {
          userId: user.user_id,
          commissionId: commissionData.commission_id,
        },
      },
    });

    if (link) throw userLinkedError;

    const commissionUser = await prisma.commissionUser.create({
      data: {
        userId: user.user_id,
        commissionId: commissionData.commission_id,
      },
    });

    res.status(201).send({ commissionUser });
  } catch (err) {
    next(err);
  }
};
