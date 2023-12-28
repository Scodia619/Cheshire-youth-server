const cycImage ="https://i.ibb.co/zsMqH6f/Cheshire-Youth-Commission-2023.jpg"


const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seed = async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "Topic" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Commission" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Reports" RESTART IDENTITY`;
  await prisma.$executeRaw`TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CommissionUser" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CommissionTopics" RESTART IDENTITY CASCADE`;

  await prisma.users.createMany({
    data: [{username: 'scodia619', password: 'sha1$18970629$1$0aa11b7fa71125c6711eb31bde91524b9ec34418', isAdmin: true},
    {username: 'billy', password: 'sha1$18970629$1$0aa11b7fa71125c6711eb31bde91524b9ec34418', isAdmin: true}
  ]
  })

  await prisma.topic.createMany({
    data: [
      {
        topic: "relationships with the police",
        topic_description:
          "How we can improve relations between the police and the public",
          topic_img: 'https://i.ibb.co/j49FZ9L/savernake-knives-vw-I-e-Ms-2-Ms-unsplash.jpg'
      },
      { topic: "knife crime", topic_description: "Talking about knife crime",
    topic_img: 'https://i.ibb.co/jgQHJSj/king-s-church-international-3mjspm-QDM-M-unsplash.jpg' },
    ],
  });

  await prisma.commission.createMany({
    data: [{ commission: "Cheshire", commission_image: cycImage }, { commission: "Cumbria" , commission_image: cycImage}, {commission: "Nottingham", commission_image: cycImage}],
  });

  await prisma.commissionUser.createMany({
    data: [{userId: 1, commissionId: 1}, {userId: 1, commissionId: 2}]
  })

  await prisma.commissionTopics.createMany({
    data: [{commissionId: 1, topicId: 1}, {commissionId: 1, topicId: 2}, {commissionId: 2, topicId: 2}]
  })

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