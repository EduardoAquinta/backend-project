const request = require('supertest');
const app = require('../app');
const db = require('../db');

// afterAll(() => {
//     if (db.end) db.end();
// })

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