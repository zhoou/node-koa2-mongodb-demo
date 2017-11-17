const Router = require('koa-router')
const authentication = require('./controllers/authsControl')
const articles = require('./controllers/articlesControl')

const router = new Router();

// Auth api
router.post('/api/login', authentication.Login)
router.post('/api/signup', authentication.SignUp)
router.post('/api/updatepassword', authentication.UpdatePassword)

// Permission Validation
// request Headers setting => (Authorization: 'bearer ' + token)
// router.use('/api/*', authentication.Verify)

// Article api
router.get('/api/getarticlelists', articles.GetArticleLists)
router.post('/api/createarticle', articles.CreateArticle)
router.get('/api/getarticlebyid', articles.GetArticleById)

module.exports = router