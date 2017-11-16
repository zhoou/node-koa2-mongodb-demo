const Router = require('koa-router')
const authentication = require('./controllers/authsControl')
const articles = require('./controllers/articlesControl')

const router = new Router();

router.post('/api/login', authentication.Login)
router.post('/api/signup', authentication.SignUp)

// Permission Validation
// request Headers setting => (Authorization: 'bearer ' + token)
router.use('/api/*', authentication.Verify)

router.get('/api/getdata', articles.GetArticleList)

module.exports = router