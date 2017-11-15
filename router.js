const Router = require('koa-router');
const passport = require('./servers/common/passport');
const authentication = require('./servers/controllers/authsControl');

const requireAuth = passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true, session: false })

const router = new Router();

// router.post('/api/login', requireAuth, authentication.Login);
router.post('/api/login', authentication.Login);
router.post('/api/signup', authentication.signUp);

module.exports = router