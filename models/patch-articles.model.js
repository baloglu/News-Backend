const format = require("pg-format")
const db = require('../db/connection');

function patchArticleModel(article_id, body) {
    // article body will contain { inc_votes: vote_number }
    const { inc_votes } = body
    const query = format(`UPDATE articles SET votes = %s WHERE article_id = %s RETURNING *;`, inc_votes, article_id)
    return db.query(
        query
    )
}

module.exports = { patchArticleModel }