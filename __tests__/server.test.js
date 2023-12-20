const app = require("../app");
const request = require("supertest");
const { expect } = require("@jest/globals");

const seed = require("../prisma/seed");
beforeEach(() => seed());

describe("Post a new report to database", () => {
  test("201 - creates the report", () => {
    const newPost = {
      commission_name: "cheshire",
      topic_name: "relationships with the police",
      body_experience:
        "The police raided my house and arrested my mum for drugs but got the wrong house",
      body_improvement: "Make sure the police get the correct address",
    };
    return request(app)
      .post("/api/reports")
      .send(newPost)
      .expect(201)
      .then(({ body: { report } }) => {
        expect(report).toMatchObject({
          report_id: expect.any(Number),
          commission_name: "cheshire",
          body_experience:
            "The police raided my house and arrested my mum for drugs but got the wrong house",
          body_improvement: "Make sure the police get the correct address",
          topic_name: "relationships with the police",
        });
      });
  });
  test("400 - Missing Data", () => {
    const newPost = {
      topic_name: "relationships with the police",
      body_experience:
        "The police raided my house and arrested my mum for drugs but got the wrong house",
      body_improvement: "Make sure the police get the correct address",
    };
    return request(app)
      .post("/api/reports")
      .send(newPost)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          "Bad Request - Data Needed or Topic / Commission doesnt exist"
        );
      });
  });
  test("400 - No Topic", () => {
    const newPost = {
      commission_name: "cheshire",
      topic_name: "Mental Health",
      body_experience:
        "The police raided my house and arrested my mum for drugs but got the wrong house",
      body_improvement: "Make sure the police get the correct address",
    };
    return request(app)
      .post("/api/reports")
      .send(newPost)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          "Bad Request - Data Needed or Topic / Commission doesnt exist"
        );
      });
  });
  test("400 - No Commission", () => {
    const newPost = {
      commission_name: "london",
      topic_name: "relationships with the police",
      body_experience:
        "The police raided my house and arrested my mum for drugs but got the wrong house",
      body_improvement: "Make sure the police get the correct address",
    };
    return request(app)
      .post("/api/reports")
      .send(newPost)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          "Bad Request - Data Needed or Topic / Commission doesnt exist"
        );
      });
  });
});

describe("Get all reports", () => {
  test("200: gets all the reports", () => {
    return request(app)
      .get("/api/reports")
      .expect(200)
      .then(({ body: { reports } }) => {
        expect(reports).toHaveLength(3);
        reports.forEach((report) => {
          expect(report).toMatchObject({
            report_id: expect.any(Number),
            commission_name: expect.any(String),
            body_experience: expect.any(String),
            body_improvement: expect.any(String),
            topic_name: expect.any(String),
          });
        });
      });
  });
});

describe("gets reports based on commission", () => {
  test("200 - gets an article based on the all articles based on commission", () => {
    return request(app)
      .get("/api/reports/cheshire")
      .expect(200)
      .then(({ body: { reports } }) => {
        expect(reports).toHaveLength(2);
        reports.forEach((report) => {
          expect(report).toMatchObject({
            report_id: expect.any(Number),
            commission_name: "cheshire",
            body_experience: expect.any(String),
            body_improvement: expect.any(String),
            topic_name: expect.any(String),
          });
        });
      });
  });
  test("404 - No commission", () => {
    return request(app)
      .get("/api/reports/banana")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No commission found");
      });
  });
  test("400 - Incorrect Data type for commission", () => {
    return request(app)
      .get("/api/reports/1")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Incorrect data type for commission");
      });
  });
  test("200 - No Records", () => {
    return request(app)
      .get("/api/reports/nottingham")
      .expect(200)
      .then(({ body: { reports } }) => {
        expect(reports).toEqual([]);
      });
  });
});

describe("Gets commission by name", () => {
  test("200 - gets a commission and returns all data", () => {
    return request(app)
      .get("/api/commission/cheshire")
      .expect(200)
      .then(({ body: { commission } }) => {
        expect(commission).toMatchObject({
          commission_id: expect.any(Number),
          commission: "cheshire",
        });
      });
  });
  test("404 - No commission", () => {
    return request(app)
      .get("/api/commission/banana")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No commission found");
      });
  });
  test("404 - Incorrect Data type for commission", () => {
    return request(app)
      .get("/api/commission/1")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Incorrect data type for commission");
      });
  });
});

describe("Adding Topic query for commission reports", () => {
  test("200 - only gets the topic of query", () => {
    return request(app)
      .get("/api/reports/cheshire?topic=knife crime")
      .expect(200)
      .then(({ body: { reports } }) => {
        expect(reports).toHaveLength(1);
        reports.forEach((report) => {
          expect(report).toMatchObject({
            report_id: expect.any(Number),
            commission_name: "cheshire",
            body_experience: "I got stabbed by a person on my college course",
            body_improvement:
              "Have more presence on college grounds as its more children that carry knives",
            topic_name: "knife crime",
          });
        });
      });
  });
  test("404 - Topic doesnt exist", ()=> {
    return request(app)
    .get("/api/reports/cheshire?topic=mental health")
    .expect(404)
    .then(({body})=>{
        expect(body.msg).toBe("No Topic Found")
    })
  })
  test("400 - Incorrect Data Type", ()=> {
    return request(app)
    .get("/api/reports/cheshire?topic=1")
    .expect(400)
    .then(({body})=>{
        expect(body.msg).toBe("Incorrect Data Type")
    })
  })
  test("200 - No records returns an empty array", ()=>{
    return request(app)
    .get("/api/reports/cumbria?topic=relationships with the police")
    .expect(200)
    .then(({body: {reports}})=> {
        expect(reports).toEqual([])
    })
  })
});
