const app = require("../app");
const request = require("supertest");
const { expect } = require("@jest/globals");

const seed = require("../prisma/seed");
beforeEach(() => seed());

describe("Post a new report to database", () => {
  test("201 - creates the report", () => {
    const newPost = {
      commission_name: "Cheshire",
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
          commission_name: "Cheshire",
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
      commission_name: "Cheshire",
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
      .get("/api/reports/Cheshire")
      .expect(200)
      .then(({ body: { reports } }) => {
        expect(reports).toHaveLength(2);
        reports.forEach((report) => {
          expect(report).toMatchObject({
            report_id: expect.any(Number),
            commission_name: "Cheshire",
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
      .get("/api/reports/Nottingham")
      .expect(200)
      .then(({ body: { reports } }) => {
        expect(reports).toEqual([]);
      });
  });
});

describe("Gets commission by name", () => {
  test("200 - gets a commission and returns all data", () => {
    return request(app)
      .get("/api/commission/Cheshire")
      .expect(200)
      .then(({ body: { commission } }) => {
        expect(commission).toMatchObject({
          commission_id: expect.any(Number),
          commission: "Cheshire",
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
      .get("/api/reports/Cheshire?topic=knife crime")
      .expect(200)
      .then(({ body: { reports } }) => {
        expect(reports).toHaveLength(1);
        reports.forEach((report) => {
          expect(report).toMatchObject({
            report_id: expect.any(Number),
            commission_name: "Cheshire",
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
    .get("/api/reports/Cheshire?topic=mental health")
    .expect(404)
    .then(({body})=>{
        expect(body.msg).toBe("No Topic Found")
    })
  })
  test("400 - Incorrect Data Type", ()=> {
    return request(app)
    .get("/api/reports/Cheshire?topic=1")
    .expect(400)
    .then(({body})=>{
        expect(body.msg).toBe("Incorrect Data Type")
    })
  })
  test("200 - No records returns an empty array", ()=>{
    return request(app)
    .get("/api/reports/Cumbria?topic=relationships with the police")
    .expect(200)
    .then(({body: {reports}})=> {
        expect(reports).toEqual([])
    })
  })
});

describe('gets all commissions', ()=>{
    test('200 - gets all commissions',()=>{
        return request(app)
        .get('/api/commission')
        .expect(200)
        .then(({body: {commissions}})=>{
            expect(commissions).toHaveLength(3)
        })
    })
})

describe('logging in a user', ()=>{
  test('200 - gets the correct user', ()=>{
    const user = {
      username: 'scodia619',
      password: '1234'
    }
    return request(app)
    .post('/api/users/login')
    .send(user)
    .expect(200)
    .then(({body: {user}})=>{
      expect(user.username).toBe('scodia619')
      expect(user.password).toBe('1234')
      expect(user.isAdmin).toEqual(true)
    })
  })
  test('400 - No username', ()=>{
    const user = {
      username: 'andy123',
      password: '1234'
    }
    return request(app)
    .post('/api/users/login')
    .send(user)
    .expect(400)
    .then(({body})=>{
      expect(body.msg).toBe('Invalid Username')
    })
  })
  test('400 -Invalid Password', ()=> {
    const user = {
      username: 'scodia619',
      password: '2134'
    }
    return request(app)
    .post('/api/users/login')
    .send(user)
    .expect(400)
    .then(({body})=>{
      expect(body.msg).toBe('Invalid Password')
    })
  })
})

describe("Get all commissions based on a user", ()=>{
  test("200 - gets all users", ()=>{
    return request(app)
    .get("/api/commission/user/1")
    .expect(200)
    .then(({body: {commissions}})=>{
      expect(commissions).toHaveLength(1)
      commissions.forEach(commission => {
        expect(commission.userId).toBe(1)
        expect(commission.commissionId).toBe(1)
      })
    })
  })
  test("400 - wrong data type for user", ()=>{
    return request(app)
    .get("/api/commission/user/banana")
    .expect(400)
    .then(({body})=>{
      expect(body.msg).toBe("Invalid Data Type")
    })
  })
})