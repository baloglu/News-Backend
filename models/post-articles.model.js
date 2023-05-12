const format = require("pg-format")
const db = require('../db/connection');

function postArticleCommentsModel(article_id, author, body) {
    const query = format(`INSERT INTO comments (article_id, author, body) VALUES %L RETURNING *;`, [[article_id, author, body]])
    console.log(query)
    return db.query(
        query
    )
}
/* 
        body VARCHAR NOT NULL,
        article_id INT REFERENCES articles(article_id) NOT NULL,
        author VARCHAR REFERENCES users(username) NOT NULL,
        votes INT DEFAULT 0 NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
*/
module.exports = { postArticleCommentsModel }