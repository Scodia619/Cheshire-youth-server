const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Reject on Not Found Error
exports.selectCommissionByName = async (req, res, next) => {
    const {commission} = req.params
    try{

        if (!isNaN(parseInt(commission))) {
            const error = new Error();
            error.code = "INVALID_DATA";
            error.status = 400
            error.msg = "Incorrect data type for commission"
            throw error;
          }

        const commissionData = await prisma.commission.findUnique({
            where: {
                commission: commission
            },
        })
        if (!commissionData) {
            const error = new Error("No Commission Found");
            error.code = "P2025"; // Custom error code
            throw error; // Throw the custom error
          }
        res.status(200).json({commission: commissionData})
    }catch(err){
        next(err)
    }
}

exports.selectAllCommissions = async (req, res, next) => {
    try{
        const commissions = await prisma.commission.findMany()
        res.status(200).send({commissions})
    }catch(err){
        next()
    }
}