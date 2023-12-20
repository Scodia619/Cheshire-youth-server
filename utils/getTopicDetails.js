const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getTopicDetails = async (topic) => {
    try{

        if (!isNaN(parseInt(topic))) {
            const error = new Error();
            error.code = "INVALID_DATA";
            error.status = 400
            error.msg = "Incorrect Data Type"
            throw error;
          }

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

  module.exports = getTopicDetails