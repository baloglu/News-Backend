const { postArticleCommentsModel } = require('../models/post-articles.model')

function postArticleComments(request, response, next) {
    const { article_id } = request.params
    const comment = request.body
    postArticleCommentsModel(article_id, comment.username, comment.body)
        .then(result => {
            const inserted = result.rows[0]
            response.status(201).send(inserted)
        })
        .catch(err => {
            next(err)
    })
}

module.exports = { postArticleComments }