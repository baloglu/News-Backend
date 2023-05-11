const express = require("express")
const getTopics = require("./controllers/get-topics.controller")
const getEndpoints = require("./controllers/get-endpoints.controller")
const getArticlesId = require("./controllers/get-articles.controller")
const app = express()

app.get("/api", getEndpoints)
app.get("/api/topics", getTopics)
app.get("/api/articles/:article_id", getArticlesId)
app.use((error, request, response, next) => {
    // General error, will be updated as needed
    if (error.code === '22P02') {
        return response.status(400).send({ msg: 'Invalid input syntax' })
    }
    if (error.status && error.msg) {
        return response.status(error.status).send(error)
    }
    console.log(error)
    return response.status(500).send(error)
})

module.exports = app