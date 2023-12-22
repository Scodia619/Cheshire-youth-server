const cycImage ="https://i.ibb.co/zsMqH6f/Cheshire-Youth-Commission-2023.jpg"

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seed = async () => {
  await prisma.reports.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.commission.deleteMany();
  await prisma.users.deleteMany();
  await prisma.$executeRaw`TRUNCATE TABLE "Topic" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Commission" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Reports" RESTART IDENTITY`;
  await prisma.$executeRaw`TRUNCATE TABLE "Users" RESTART IDENTITY`;

  await prisma.users.create({
    data: {username: 'scodia619', password: '1234', isAdmin: true}
  })

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
    data: [{ commission: "Cheshire", commission_image: cycImage }, { commission: "Cumbria" , commission_image: cycImage}, {commission: "Nottingham", commission_image: cycImage}],
  });

  await prisma.reports.createMany({
    data: [{
        commission_name: "Cumbria",
        body_experience: "I got stabbed by a person on my college course",
        body_improvement:
          "Have more presence on college grounds as its more children that carry knives",
        topic_name: "knife crime",
    },
    {
        commission_name: "Cheshire",
        body_experience: "Police searched me without probable cause and didnt inform me of any rights",
        body_improvement:
          "Have more staff trained around the stop and search so they can better improve the experience for the public",
        topic_name: "relationships with the police",
    },
    {
      commission_name: "Cheshire",
      body_experience: "I got stabbed by a person on my college course",
      body_improvement:
        "Have more presence on college grounds as its more children that carry knives",
      topic_name: "knife crime",
  },
]
  });
};

module.exports = seed;