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
    test("/api endpoint should return a JSON object describing the API", () => {
        return request(app)
        .get("/api")
        .expect(200)
            .then((result) => {
                const topics = result.body.endpoints;
                const expected = "GET /api"
                expect(topics).toHaveProperty(expected)
                expect(topics).toHaveProperty("GET /api/topics")
        });
    })
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
    test("/api/articles/:article_id endpoint should return an article object", () => {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
            .then((result) => {
                const article = result.body.article;
                const expected = {"article_id": 1, "article_img_url": "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700", "author": "butter_bridge", "body": "I find this existence challenging", "created_at": "2020-07-09T20:11:00.000Z", "title": "Living in the shadow of a great man", "topic": "mitch", "votes": 100}
                expect(article).toEqual(expected)
        });
    })
    test("/api/articles/100 should return an error with status 400", () => {
        return request(app)
        .get("/api/articles/100")
        .expect(400)
            .then((result) => {
                const article = JSON.parse(result.error.text).msg;
                const expected = "Article doesn't exist"
                expect(article).toEqual(expected)
        });
    })
    test("/api/articles/hello endpoint should return an error with status 422", () => {
        return request(app)
        .get("/api/articles/hello")
        .expect(400)
            .then((result) => {
                const article = JSON.parse(result.error.text).msg;
                const expected = 'Invalid input syntax'
                expect(article).toEqual(expected)
        });
    })
    test("/api/articles endpoint should return all articles in an array", () => {
        return request(app)
        .get("/api/articles")
        .expect(200)
            .then((result) => {
                const articles = result.body.articles;
                const expected = 12
                expect(articles.length).toBe(expected)
                expect(articles[0]).toHaveProperty('article_id')
                expect(articles[0]).toHaveProperty('author')
                expect(articles[0]).toHaveProperty('title')
                expect(articles[0]).toHaveProperty('topic')
                expect(articles[0]).toHaveProperty('created_at')
                expect(articles[0]).toHaveProperty('votes')
                expect(articles[0]).toHaveProperty('article_img_url')
                expect(articles[0]).toHaveProperty('comment_count')
        });
    })
    test("/api/articles should return array of articles in date descending order", () => {
        return request(app)
        .get("/api/articles")
        .expect(200)
            .then((result) => {
                const articles = result.body.articles;
                const expected = 'created_at'
                expect(articles).toBeSortedBy(expected, {descending: true})
        });
    })
    test("/api/articles/:article_id/comments endpoint should return all article comments in an array", () => {
        return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then((result) => {
                const comments = result.body.comments;
                const expected = 11
                expect(comments.length).toBe(expected)
                expect(comments).toEqual(expect.arrayContaining([
                    {
                        comment_id: expect.any(Number),
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        article_id: 1,
                    }
                ]))
                

        });
    })
    test("/api/articles/:article_id/comments should return array of comments in date descending order", () => {
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
            .then((result) => {
                const comments = result.body.comments;
                const expected = 'created_at'
                expect(comments).toBeSortedBy(expected, {descending: true})
        });
    })
    test("When article id doesn't exist for comments it should return an error", () => {
        return request(app)
        .get("/api/articles/100/comments")
        .expect(404)
            .then((result) => {
                const message = JSON.parse(result.error.text).msg;
                const expected = "This article doesn't exist!"
                expect(message).toEqual(expected)
        });
    })
    test("When article doesn't have any comments it should return an error", () => {
        return request(app)
        .get("/api/articles/2/comments")
        .expect(404)
            .then((result) => {
                const message = JSON.parse(result.error.text).msg;
                const expected = 'There are no comments for this article'
                expect(message).toEqual(expected)
        });
    })
    test("When article id for comments is not a number it should return syntax error", () => {
        return request(app)
        .get("/api/articles/hundred/comments")
        .expect(400)
            .then((result) => {
                const message = JSON.parse(result.error.text).msg;
                const expected = 'Invalid input syntax'
                expect(message).toEqual(expected)
        });
    })
    test("Posting to /api/articles/:article_id/comments should return the posted comment", () => {
        const comment = { username: 'lurker', body: 'Hello'}
        return request(app)
        .post("/api/articles/1/comments").send(comment)
        .expect(201)
            .then((result) => {
                const { article }  = result.body;
                expect(article).toHaveProperty("article_id", 1)
                expect(article).toHaveProperty("body", "Hello")
                expect(article).toHaveProperty("author", "lurker")
        });
    })
    test("Posting comments with user not in users table should return an error", () => {
        const comment = { username: 'chetin', body: 'Hello'}
        return request(app)
        .post("/api/articles/1/comments").send(comment)
        .expect(500)
            .then((result) => {
                const msg = JSON.parse(result.text).msg
                expect(msg).toBe("Database key error")
        });
    })
    test("Patching /api/articles/:article_id should return the patched article", () => {
        const inc_votes = { inc_votes: 10 }
        return request(app)
        .patch("/api/articles/1").send(inc_votes)
        .expect(200)
            .then((result) => {
                const { article } = result.body;
                expect(article).toHaveProperty("article_id", 1)
                expect(article).toHaveProperty("votes", 10)
        });
    })
    test("When article id doesn't exist patching should return an error", () => {
        const inc_votes = { inc_votes: 10 }
        return request(app)
        .patch("/api/articles/100").send(inc_votes)
        .expect(400)
            .then((result) => {
                console.log(result.body)
                const message = JSON.parse(result.error.text).msg;
                const expected = "Article doesn't exist"
                expect(message).toEqual(expected)
        });
    })
})