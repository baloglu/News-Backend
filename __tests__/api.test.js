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
    test("/api/topics endpoint should fetch all topics", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
            .expect((result) => {
            const expected = [{"description": "The man, the Mitch, the legend", "slug": "mitch"}, {"description": "Not dogs", "slug": "cats"}, {"description": "what books are made of", "slug": "paper"}]
          expect(result.body).toEqual(expected);
        });
    })
})