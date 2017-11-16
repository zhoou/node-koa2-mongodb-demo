const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../schemas/user')
const config = require('../config')

/** 用户名密码验证策略 */
const localOptions = { // or whatever you want to use
  usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
  passwordField: 'password',
  session: false
}

passport.use(new LocalStrategy (localOptions, 
  /**
   * @param username 用户输入的用户名
   * @param password 用户输入的密码
   * @param done 验证验证完成后的回调函数，由passport调用
   */
  (username, password, done) => {
    User.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      user.validPassword(password, (err, isAuthorize) => {
        if (!isAuthorize) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
    });
  }
))

/** JWT验证 */
const jwtOptions = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('bearer'),
  secretOrKey : config.secret,
  session: false
}
passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  const user = await User.findById(payload.user.id).exec();
  if(user)
      done(null, user);
  else
      done(null, false);
}))

// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser(function (user, done) {
  done(null, user)
})

// deserializeUser 在每次请求的时候将从 session 中读取用户对象，并将其封装到 req.user
passport.deserializeUser(function (user, done) {
  return done(null, user)
})

module.exports = passport;