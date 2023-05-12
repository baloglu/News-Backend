const format = require("pg-format")
const db = require('../db/connection');

function postArticleCommentsModel(article_id, author, body) {
    const query = format(`INSERT INTO comments (article_id, author, body) VALUES %L RETURNING *;`, [[article_id, author, body]])
    return db.query(
        query
    )
}

module.exports = { postArticleCommentsModel }