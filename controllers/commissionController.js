const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Reject on Not Found Error
exports.selectCommissionByName = async (req, res, next) => {
    const {commission_name} = req.params || commission
    try{

        if (!isNaN(parseInt(commission_name))) {
            const error = new Error();
            error.code = "INVALID_DATA";
            error.status = 400
            error.msg = "Incorrect data type for commission"
            throw error;
          }

        const commission = await prisma.commission.findUnique({
            where: {
                commission: commission_name
            },
        })
        if (!commission) {
            const error = new Error("No Commission Found");
            error.code = "P2025"; // Custom error code
            throw error; // Throw the custom error
          }
        res.status(200).json({commission})
    }catch(err){
        console.log(err)
        next(err)
    }
}