const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCommissionDetails = async (commission_name) => {
    try{

        if (!isNaN(parseInt(commission_name))) {
            const error = new Error();
            error.code = "INVALID_DATA";
            error.status = 400
            error.msg = "Incorrect data type for commission"
            throw error;
          }

        const commissionData = await prisma.commission.findUnique({
            where: {
                commission: commission_name
            },
        })
        if (!commissionData) {
            const error = new Error();
            error.code = 'NO_COMISSION'
            error.msg = "No Commission Found"
            error.status = 400
            throw error; // Throw the custom error
          }
          return commissionData
    } catch (err) {
      throw err;
    }
  };

  module.exports = getCommissionDetails