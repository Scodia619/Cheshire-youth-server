const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCommissionDetails = async (commission) => {
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
          return commissionData
    } catch (err) {
      throw err;
    }
  };

  module.exports = getCommissionDetails