const getTopicsModel = require('../models/get-topics.model')

function getTopics(request, response){
    return getTopicsModel().then((result) => {
        return response.status(200).send(result.rows)
    })
}

module.exports = getTopics