const db = require('../db/connection');

function getTopicsModel() {
    return db.query('SELECT slug, description FROM topics;');
}

module.exports = getTopicsModel