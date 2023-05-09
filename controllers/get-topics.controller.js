const getTopicsModel = require('../models/get-topics.model')

function getTopics(request, response){
    return getTopicsModel().then((result) => {
        return response.status(200).send({ topics: result.rows })
    })
        .catch(err => {
            next(err)
    })
}

module.exports = getTopics