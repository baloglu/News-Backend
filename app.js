const express = require("express")
const getTopics = require("./controllers/get-topics.controller")
const getEndpoints = require("./controllers/get-endpoints.controller")
const { getArticles, getArticleId, getArticleComments } = require("./controllers/get-articles.controller")
const { postArticleComments } = require("./controllers/post-articles.controller")
const { patchArticle } = require("./controllers/patch-articles.controller")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

app.get("/api", getEndpoints)
app.get("/api/topics", getTopics)
app.get("/api/articles", getArticles)
app.get("/api/articles/:article_id", getArticleId)
app.get("/api/articles/:article_id/comments", getArticleComments)

app.post("/api/articles/:article_id/comments", postArticleComments)
app.patch("/api/articles/:article_id", patchArticle)

app.use((error, request, response, next) => {
    // General error, will be updated as needed
    if (error.code === '22P02') {
        return response.status(400).send({ msg: 'Invalid input syntax' })
    }
    if (error.code === '23503') {
        return response.status(500).send({ msg: 'Database key error' })
    }
    if (error.status && error.msg) {
        return response.status(error.status).send(error)
    }
    return response.status(500).send(error)
})

module.exports = app