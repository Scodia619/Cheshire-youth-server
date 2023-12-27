const { PrismaClient } = require("@prisma/client");
const { incorrectDataError, noCommissionError, noUserError, userExistsError } = require("./errorConstants");
const prisma = new PrismaClient();

exports.getCommissionDetails = async (commission_name) => {
    try{

        if (!isNaN(parseInt(commission_name))) throw incorrectDataError

        const commissionData = await prisma.commission.findUnique({
            where: {
                commission: commission_name
            },
        })
        if (!commissionData) throw noCommissionError
          return commissionData
    } catch (err) {
      throw err;
    }
  };

  exports.getTopicDetails = async (topic) => {
    try{

        if (!isNaN(parseInt(topic))) throw incorrectDataError

        const topicData = await prisma.topic.findUnique({
            where: {
                topic: topic
            },
        })
        if (!topicData) {
            const error = new Error("No Topic Found");
            error.code = "P2025";
            error.status = 404 // Custom error code
            error.msg = "No Topic Found"
            throw error; // Throw the custom error
          }
          return topicData
    } catch (err) {
      throw err;
    }
  };

  exports.getAllUsers = async (username) => {
    const user = await prisma.users.findUnique({
        where: {
            username: username
        }
    })

    if(!user) throw noUserError
    return user
  }

  exports.getUsersForPost = async (username) => {
    const user = await prisma.users.findUnique({
        where: {
            username: username
        }
    })
    if(user) throw userExistsError
  }