const Article = require('../models/articles')

module.exports = {
    retrieveArticles: (req, res) => {
        Article.find().sort({ createdAt: -1 })
            .populate('userId')
            .then(articles => {
                res.status(200).json({ message: 'retrieve articles success', articles })
            })
            .catch(err => {
                res.status(500).json({ error: err });
            })
    },
    //articles by author
    getArticlesByUserId: (req, res) => {
        const userId = req.params.id;
        Article.find({ userId }).sort({ createdAt: -1 })
            .populate('userId')
            .then(articles => {
                res.status(200).json({ message: 'retrieve articles by user success', articles })
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    },
    getArticlesByCategory: (req, res) => {
        const category = req.params.q
        Article.find({ category }).sort({ createdAt: -1 })
            .populate('userId')
            .then(articles => {
                res.status(200).json({ message: 'retrieve articles by user success', articles })
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    },
    getArticlesById: (req, res) => {
        let id = req.params.id
        Article.findById({ _id: id })
            .populate('userId')
            .then(article => {
                res.status(200).json({ message: 'fetch article success', article })
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
    },
    addArticles: (req, res) => {
        let newArticle = {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            userId: req.user.id
        }

        // if req.file undefined let skip the image updated
        if (req.file && req.file.cloudStoragePublicUrl) {
            newArticle.imageUrl = req.file.cloudStoragePublicUrl
        } else {
            newArticle.imageUrl = null
        }

        let article = new Article(newArticle)
        article.save()
            .then(result => {
                res.status(201).json({ message: "create article success", data: result })
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
    },
    updateArticle: (req, res) => {
        const id = req.params.id;
        let article = {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            userId: req.user.id
        }
        // if req.file undefined let skip the image updated
        if (req.file && req.file.cloudStoragePublicUrl) {
            article.imageUrl = req.file.cloudStoragePublicUrl
        }

        Article.findByIdAndUpdate(
            { _id: id }, {
                $set: article
            }
        )
            .then(result => {
                res.status(200).json({ message: "update article success", data: result })
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
    },
    deleteArticle: (req, res) => {
        let id = req.params.id
        Article.findByIdAndRemove({
            _id: id
        })
            .then(result => {
                res.status(200).json({ message: "delete article success", data: null })
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
    }
}