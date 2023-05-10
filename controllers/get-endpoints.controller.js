const getEndpointsModule = require('../models/get-endpoints.model')

function getEndpoints(request, response) {
    getEndpointsModule().then(result => {
        return response.status(200).send({ endpoints: JSON.parse(result) } );
    })
    
}

module.exports = getEndpoints