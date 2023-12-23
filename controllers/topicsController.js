const { PrismaClient } = require("@prisma/client");
const getCommissionDetails = require("../utils/getCommissionDetails");
const prisma = new PrismaClient();

exports.getTopicsByCommission = async (req, res, next) => {

    const {commission_name} = req.params

    try{

    const commission = await getCommissionDetails(commission_name)

    const parsedId = parseInt(commission.commission_id)

    const topics = await prisma.commissionTopics.findMany({
        where: {
            commissionId: parsedId
        },
        include: {
            topic: true
        }
    })

    res.status(200).send({topics})

}catch(err){
    next(err)
}

}