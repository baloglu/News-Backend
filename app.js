const express = require("express")
const getTopics  = require("./controllers/get-topics.controller")
const app = express()

app.get("/api/topics", getTopics)

app.use((error, request, response, next) => {
    // General error, will be updated as needed
    // As this error will likely be coming from database, 500 looks like a better error
    return response.status(500).send(error)
})

module.exports = app