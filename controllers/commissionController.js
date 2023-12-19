const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Reject on Not Found Error
exports.selectCommissionByName = async (req, res, next) => {
    const {commission_name} = req.params
    try{
        const commission = await prisma.commission.findUnique({
            where: {
                commission: commission_name
            },
            rejectOnNotFound: true,
        })
        res.status(200).send(commission)
    }catch(err){
        console.log(err)
        next(err)
    }
}