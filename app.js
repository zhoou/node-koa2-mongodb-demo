const http = require('http')
// const https = require('https')
const Koa = require('koa')
const KeyGrip = require('keyGrip')
const config = require('./config')
const logger = require('./logs')
const app = new Koa()

// setting keys
app.keys = new KeyGrip(['i am a newer secret', 'i like node koa'], 'sha256')

// setting X-Response-Time
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// logger
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  logger.log('info', `${ctx.method} ${ctx.url}`)
})

// response
app.use(async ctx => {
  // These keys(app.keys) may be rotated and are used when signing cookies with the { signed: true }
  ctx.cookies.set('name', 'zhoou', { signed: true })
  ctx.body = "Hello, world!"
})

// error
app.on('error', (err, ctx) => {
  logger.log('error', `${ctx.method} ${ctx.url} ${err}`)
});

// app.listen(3000)
http.createServer(app.callback()).listen(config.port, () => {
  logger.log('info', `node-Koa Run！port at ${config.port}`)
})
// https.createServer(app.callback()).listen(config.https_port)