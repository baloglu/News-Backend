const fs = require("fs/promises")

function getEndpointsModule() {
    return fs.readFile(`${__dirname}/../endpoints.json`)
}

module.exports = getEndpointsModule