const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seed = async () => {
  await prisma.reports.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.commission.deleteMany();

  await prisma.topic.createMany({
    data: [
      {
        topic: "relationships with the police",
        topic_description:
          "How we can improve relations between the police and the public",
      },
      { topic: "knife crime", topic_description: "Talking about knife crime" },
    ],
  });

  await prisma.commission.createMany({
    data: [{ commission: "cheshire" }, { commission: "cumbria" }, {commission: "nottingham"}],
  });

  await prisma.reports.createMany({
    data: [{
        commission_name: "cumbria",
        body_experience: "I got stabbed by a person on my college course",
        body_improvement:
          "Have more presence on college grounds as its more children that carry knives",
        topic_name: "knife crime",
    },
    {
        commission_name: "cheshire",
        body_experience: "Police searched me without probable cause and didnt inform me of any rights",
        body_improvement:
          "Have more staff trained around the stop and search so they can better improve the experience for the public",
        topic_name: "relationships with the police",
    },
    {
      commission_name: "cheshire",
      body_experience: "I got stabbed by a person on my college course",
      body_improvement:
        "Have more presence on college grounds as its more children that carry knives",
      topic_name: "knife crime",
  },
]
  });
};

module.exports = seed;
