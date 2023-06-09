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

function getArticlesModel() {

    return db.query(`SELECT DISTINCT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, 
    articles.votes, articles.article_img_url, (SELECT count(*) from comments WHERE comments.article_id = articles.article_id) as comment_count
     FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id ORDER BY articles.created_at DESC;`)
        .then(result => {
            if (result.rows.length === 0) {
                return Promise.reject({ status: 400, msg: "There are no articles" })
            }
            return result;
        })
}

function getArticleCommentsModel(article_id) {

    return db.query(`SELECT article_id FROM articles WHERE article_id = $1;`, [article_id])
        .then((result) => {

            if (result.rows.length === 0) return Promise.reject({ status: 404, msg: "This article doesn't exist!" })
            else {
                return db.query(`SELECT comment_id, votes, created_at, author, body, article_id 
                FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`, [article_id])
                    .then(result => {
                        if (result.rows.length === 0) {
                            return Promise.reject({ status: 404, msg: "There are no comments for this article" })
                        }
                        return result;
                    })
            }
        })
        .catch(err => {
            return Promise.reject(err)
    })
}

module.exports = { getArticlesModel, getArticleIdModel, getArticleCommentsModel }