const getArticlesIdModule = require('../models/get-articles.model')

function getArticlesId(request, response, next) {
    const { article_id } = request.params
    // if (isNaN(Number(article_id))) {
    //     next({ status: 422, msg: 'Article ID must be a number' })
    // }
    getArticlesIdModule(article_id)
        .then(result => {
        return response.status(200).send({ article: result.rows[0] } );
        })
        .catch(err => {
            next(err)
    })
    
}

module.exports = getArticlesId