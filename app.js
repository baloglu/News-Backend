const express = require("express")
const getTopics  = require("./controllers/get-topics.controller")
const app = express()

app.get("/api/topics", getTopics)

app.use((error, request, response, next) => {
    // General error, will be updated as needed
    return response.status(400).send(error)
})

module.exports = app