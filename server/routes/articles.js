const express = require('express')
const router = express.Router();
const images = require('../middlewares/upload')
const isAuthenticated = require('../middlewares/authentication');
const articlesController = require('../controllers/articlesController');

router.get('/', articlesController.retrieveArticles)
router.get('/author/:q', isAuthenticated, articlesController.getArticlesByUserId)
router.get('/category/:q', isAuthenticated, articlesController.getArticlesByCategory)
router.get('/:id', articlesController.getArticlesById)
router.post('/add', isAuthenticated, images.multer.single('image'),images.sendUploadToGCS, articlesController.addArticles)
router.put('/update/:id',isAuthenticated, images.multer.single('image'), images.sendUploadToGCS, articlesController.updateArticle)
router.delete('/delete/:id',isAuthenticated, articlesController.deleteArticle)

module.exports = router;