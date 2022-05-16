const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data")
const request = require('supertest');
const app = require('../app');
const db = require('../db/connection');

//closes all databases after the test suite has run.
afterAll(() => {
     db.end();
})

//seeds the test database for utilisation in the tests. 
beforeEach(() => {
return seed(testData)
});

//An initial test to ensure the database setup is working correctly. 
describe ("GET: /api", () => {
    test("status 200: returns a message as an JSON object", () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then (({ body }) => {
            expect (body).toEqual({"message" : "all working well"})
        });
    });
});

//A test battery that ensures the categories get requests are working correctly, with appropriate error messaging tests. 
describe("GET: /api/categories", () => {
    test("status 200: response with an array of category objects with slug and desciption properties", () => {
        return request(app)
        .get("/api/categories")
        .expect(200)
        .then (({ body }) => {
            const {categories} = body;
            expect(categories).toBeInstanceOf(Array);
            expect(categories).toHaveLength(4);
            categories.forEach((category) => {
                expect(category).toEqual(expect.objectContaining(
                    {
                        slug: expect.any(String),
                        description: expect.any(String),
                    }
                ));
            });
        });
    });
    test("404: responds with an error message when given a bad route", () => {
        return request(app)
        .get("/api/elephant")
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe("Route not found");
        });
    });
});

//A test battery that ensures the review_id endpoint requests are correctly returned, with appropriate error messaging tests. 

describe("GET /api/review/:review_id", () => {
    test("status 200: responds with an object with the appropriate properties", () => {
        return request(app)
        .get("/api/review:review_id")
        .expect(200)
        .then(({ body }) => {
            const {review} = body;
            expect(review).toBeInstanceOf(Object);
            expect(review).toEqual(
                expect.objectContaining(
                    {
                    title: expect.any(String),
                    designer: expect.any(String),
                    owner: expect.any(String),
                    review_img_url: expect.any(String),
                    category: expect.any(String),
                    created_at: expect.any(Date),
                    votes: expect.any(Number),
                    }
                )
            )
        });
    });
});