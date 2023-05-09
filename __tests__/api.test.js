const request = require('supertest')
const app = require("../app")
const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data")

beforeEach(() => {
    return seed(testData)
})

afterAll(() => {
    return db.end()
})
describe("API endpoints", () => {
    test("/api/topics endpoint should fetch an array of 3 objects with slug and description properties", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
            .then((result) => {
                const topics = result.body.topics;
                const expected = [{"description": "The man, the Mitch, the legend", "slug": "mitch"}, {"description": "Not dogs", "slug": "cats"}, {"description": "what books are made of", "slug": "paper"}]
                expect(topics).toEqual(expected)
        });
    })
})