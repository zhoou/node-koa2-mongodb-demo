const jwt = require('jsonwebtoken')
const passport = require('../common/passport');
const config = require('../../config')
const User = require('../schemas/user')

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // Signing a token with 1 hour of expiration:
  const token = jwt.sign({ user: {name: user.nikename, type: user.type}, iat: timestamp }, config.secret, { expiresIn: '1h' })
  return token
}

// 登录
exports.Login = async (ctx, next) => {
  return passport.authenticate('local', (err, user, info, status) => {
    // User has already had their email and password auth'd
    // just need to give them a token
    if (!user) {
      ctx.body = {
        code: 200,
        message: info.message
      }
      return
    } else {
      ctx.body = {
        token: tokenForUser(user),
        user: { id: user.id, name: user.nikename }
      }
    }
  })(ctx, next)
};

// 注册
exports.signUp = async(ctx, next) => {
    const { email, password, repassword, nikename } = ctx.request.body;
   
    // check params
    if(!email || !password || !repassword) {
      ctx.body = {
        code: 422,
        message: 'You must provide email & password'
      };
      return
    } else if (password !== repassword) { 
      ctx.body = {
        code: 422,
        message: 'password are not the same! Please check'
      };
      return
    }

    const existingUser = await User.findOne({ email }).exec()
    if (existingUser) {
      ctx.body = {
        code: 422,
        message: 'Email is in use'
      };
      return
    }
  
    const user = new User({
        email, 
        password, 
        type: 'local', 
        nikename: nikename || email.substr(0, email.indexOf('@')) 
    })
    await user.save()

    ctx.body = {
      token: tokenForUser(user), 
      user: { id: user.id, name: user.nikename }
    }
}