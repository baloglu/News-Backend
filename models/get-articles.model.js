// I will add both models for /api/articles and /api/articles/:article_id in this file
const db = require('../db/connection');

function getArticleIdModel(article_id) {
    return db.query(`SELECT article_id, author, title, body, topic, created_at, 
    votes, article_img_url FROM articles WHERE article_id=$1;`, [article_id])
        .then(result => {
            if (result.rows.length === 0) {
                return Promise.reject({ status: 400, msg: "Article doesn't exist" })
            }
            return result;
        })
        .catch(err => {
            return Promise.reject(err)
        });
}

module.exports = getArticleIdModel