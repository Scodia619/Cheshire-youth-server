const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { customErrors, prismaErrors } = require("./errors");
const prisma = new PrismaClient();

const app = express();

app.use(express.json());

app.post("/api/report", async (req, res, next) => {
  const { commission_name, body_experience, body_improvement, topic_name } =
    req.body;

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
  }});

  app.use(customErrors)
  app.use(prismaErrors)

module.exports = app;
