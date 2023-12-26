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

exports.getCommissionByUser = async (req, res, next) => {
    try{
        const { user_id } = req.params;

        const parsedId = parseInt(user_id)

        if (isNaN(parsedId)) {
            const error = new Error();
            error.status = 400;
            error.msg = "Invalid Data Type"
            throw error;
        }

        const commissions = await prisma.commissionUser.findMany({
            where: {
              userId: parsedId // Use the specific user's ID here
            },
            include: {
              commission: true // Include the commission details
            }
          });

        res.status(200).send({commissions})
    }catch(err){
        next(err)
    }
}

exports.postCommission = async (req, res, next) => {
    try{
        const {commission, commission_image} = req.body
        if(!commission || !commission_image){
            const error = new Error();
            error.status = 400
            error.msg = 'Missing Data'
            throw error
        }

        if(!isNaN(parseInt(commission)) || !isNaN(parseInt(commission_image))){
            const error = new Error();
            error.status = 400
            error.msg = 'Incorrect Data Type'
            throw error
        }

        const commissionsData = await prisma.commission.findUnique({
            where: {
                commission: commission
            }
        })

        if(commissionsData){
            const error = new Error();
            error.status = 400
            error.msg = 'Commission already created'
            throw error
        }

        const newCommission = await prisma.commission.create({
            data: {
                commission: commission,
                commission_image: commission_image
            }
        })

        res.status(201).send({commission: newCommission})

    }catch(err){
        next(err)
    }
}

exports.linkUserToCommission = async (req,res,next) => {
    const {commission, username} = req.body
    try{
        if(!commission || !username){
            const error = new Error();
            error.status = 400
            error.msg = 'Missing Data'
            throw error
        }

        if(!isNaN(parseInt(commission)) || !isNaN(parseInt(username))){
            const error = new Error();
            error.status = 400
            error.msg = 'Incorrect Data Type'
            throw error
        }
        const commissionData = await prisma.commission.findUnique({
            where: {
                commission: commission
            }
        })

        if(!commissionData){
            const error = new Error();
            error.status = 400
            error.msg = 'Commission doesnt exist'
            throw error
        }

        const user = await prisma.users.findUnique({
            where: {
                username: username
            }
        })

        if(!user){
            const error = new Error();
            error.status = 400
            error.msg = 'User doesnt exist'
            throw error
        }

        const link = await prisma.commissionUser.findUnique({
            where: {
                userId_commissionId: {
                    userId: user.user_id,
                    commissionId: commissionData.commission_id
                }
            }
        })

        if(link){
            const error = new Error()
            error.status = 400
            error.msg = 'User already linked with commission'
            throw error
        }

        const commissionUser = await prisma.commissionUser.create({
            data: {userId: user.user_id, commissionId: commissionData.commission_id}
        })

        res.status(201).send({commissionUser})
    }
    catch(err){
        next(err)
    }
}