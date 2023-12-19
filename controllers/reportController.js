const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.postArticle = async (req, res, next) => {
    const { commission_name, body_experience, body_improvement, topic_name } =
req.body;

if (!commission_name || !body_experience || !body_improvement || !topic_name) {
  return res.status(400).json({ msg: "Bad Request - Data Needed or Topic / Commission doesnt exist" });
}

try {
const report = await prisma.reports.create({
  data: {
    commission_name,
    body_experience,
    body_improvement,
    topic_name,
  },
});
res.status(201).json({report});
} catch (err){
    next(err)
}}