const app = require("../app")
const request = require('supertest')
const { expect } = require("@jest/globals");

const seed = require("../prisma/seed")
beforeEach(() => seed());

describe('Post a new report to database', ()=> {
    test('201 - creates the report',()=>{
        const newPost = {
            commission_name: "cheshire",
            topic_name: "relationships with the police",
            body_experience: "The police raided my house and arrested my mum for drugs but got the wrong house",
            body_improvement: "Make sure the police get the correct address"
        }
        return request(app)
        .post("/api/reports")
        .send(newPost)
        .expect(201)
        .then(({body: {report}})=>{
            expect(report).toMatchObject({
                report_id: expect.any(Number),
                commission_name: 'cheshire',
                body_experience: 'The police raided my house and arrested my mum for drugs but got the wrong house',
                body_improvement: 'Make sure the police get the correct address',
                topic_name: 'relationships with the police',
              });
        })
    })
    test('400 - Missing Data', ()=>{
        const newPost = {
            topic_name: "relationships with the police",
            body_experience: "The police raided my house and arrested my mum for drugs but got the wrong house",
            body_improvement: "Make sure the police get the correct address"
        }
        return request(app)
        .post('/api/reports')
        .send(newPost)
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad Request - Data Needed or Topic / Commission doesnt exist")
        })
    })
    test('400 - No Topic', ()=>{
        const newPost = {
            commission_name: "cheshire",
            topic_name: "Mental Health",
            body_experience: "The police raided my house and arrested my mum for drugs but got the wrong house",
            body_improvement: "Make sure the police get the correct address"
        }
        return request(app)
        .post('/api/reports')
        .send(newPost)
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad Request - Data Needed or Topic / Commission doesnt exist")
        })
    })
    test('400 - No Commission', ()=>{
        const newPost = {
            commission_name: "nottingham",
            topic_name: "relationships with the police",
            body_experience: "The police raided my house and arrested my mum for drugs but got the wrong house",
            body_improvement: "Make sure the police get the correct address"
        }
        return request(app)
        .post('/api/reports')
        .send(newPost)
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad Request - Data Needed or Topic / Commission doesnt exist")
        })
    })
})

describe("Get all articles", ()=>{
    test("200: gets all the articles", ()=> {
        return request(app)
        .get("/api/reports")
        .expect(200)
        .then(({body: {reports}})=> {
            expect(reports).toHaveLength(2)
            reports.forEach(report => {
                expect(report).toMatchObject({
                    report_id: expect.any(Number),
                    commission_name: expect.any(String),
                    body_experience: expect.any(String),
                    body_improvement: expect.any(String),
                    topic_name: expect.any(String),
                  });
            })
        })
    })
})

describe("gets article based on commission", ()=>{
    test("200 - gets an article based on the all articles based on commission", ()=> {
        return request(app)
        .get("/api/reports/cheshire")
        .expect(200)
        .then(({body: {reports}})=>{
            expect(reports).toHaveLength(1)
            reports.forEach(report => {
                expect(report).toMatchObject({
                    report_id: expect.any(Number),
                    commission_name: "cheshire",
                    body_experience: expect.any(String),
                    body_improvement: expect.any(String),
                    topic_name: expect.any(String),
                })
            })
        })
    })
    test("404 - No commission", ()=> {
        return request(app)
        .get("/api/reports/banana")
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("No commission found")
        })
    })
    test("404 - Incorrect Data type for commission", ()=> {
        return request(app)
        .get("/api/reports/1")
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Incorrect data type for commission")
        })
    })
    test("400 - No Records", ()=> {
        return request(app)
        .get("/api/reports/nottingham")
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("No records for commission")
        })
    })
})

describe("Gets commission by name", ()=> {
    test("200 - gets a commission and returns all data", ()=>{
        return request(app)
        .get("/api/commission/cheshire")
        .expect(200)
        .then(({body: {commission}})=> {
            expect(commission).toMatchObject({
                commission_id: expect.any(Number),
                commission: expect("cheshire")
            })
        })
    })
    test("404 - No commission", ()=> {
        return request(app)
        .get("/api/commission/banana")
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("No commission found")
        })
    })
    test("404 - Incorrect Data type for commission", ()=> {
        return request(app)
        .get("/api/commission/1")
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Incorrect data type for commission")
        })
    })
})