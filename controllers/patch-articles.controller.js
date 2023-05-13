const { patchArticleModel } = require("../models/patch-articles.model")

function patchArticle(request, response, next) {
    const { article_id } = request.params
    const body = request.body
    patchArticleModel(article_id, body)
        .then(result => {
            response.status(200).send({ article: result.rows[0] })
    })
}

module.exports = { patchArticle }