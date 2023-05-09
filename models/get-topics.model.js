const db = require('../db/connection');

function getTopicsModel() {
    return db.query('SELECT * FROM topics;');
}

module.exports = getTopicsModel