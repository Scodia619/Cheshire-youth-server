const app = require("../app")
const request = require('supertest')
const { expect } = require("@jest/globals");

describe('Post a new report to database', ()=> {
    test('201 - creates the report',()=>{
        const newPost = {
            commission_name: "cheshire",
            topic_name: "relationships with the police",
            body_experience: "The police raided my house and arrested my mum for drugs but got the wrong house",
            body_improvement: "Make sure the police get the correct address"
        }
        return request(app)
        .post("/api/report")
        .send(newPost)
        .expect(201)
        .then(({body: {report}})=>{
            expect(report).toMatchObject({
                report_id: expect.any(Number),
                commission_name: 'cheshire',
                body_experience: 'The police raided my house and arrested my mum for drugs but got the wrong house',
                body_improvement: 'Make sure the police get the correct address',
                topic_name: 'relationships with the police',
                // Add more expectations based on the actual structure of your 'report' object
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
        .post('/api/report')
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
        .post('/api/report')
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
        .post('/api/report')
        .send(newPost)
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad Request - Data Needed or Topic / Commission doesnt exist")
        })
    })
})