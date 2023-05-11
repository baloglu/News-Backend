const { getArticlesModel, getArticleIdModel } = require('../models/get-articles.model')

function getArticleId(request, response, next) {
    const { article_id } = request.params
    getArticleIdModel(article_id)
        .then(result => {
        return response.status(200).send({ article: result.rows[0] } );
        })
        .catch(err => {
            next(err)
    })
    
}

function getArticles(request, response, next) {
    getArticlesModel()
    .then(result => {
        response.status(200).send({ articles: result.rows } );
        })
        .catch(err => {
            next(err)
    })
}
module.exports = { getArticles, getArticleId }