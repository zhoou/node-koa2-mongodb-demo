const http = require('http')
// const https = require('https')
const Koa = require('koa')
const KeyGrip = require('keyGrip')
const mongoose = require('mongoose')
const koaBody = require('koa-body')

const config = require('./config')
const logger = require('./logs')
const routers = require('./router')
const response_formatter = require('./middlewares/response_formatter')
const app = new Koa()

// setting keys
app.keys = new KeyGrip(['i am a newer secret', 'i like node koa'], 'sha256')

app.use(koaBody())

/** mongodb */
mongoose.Promise = global.Promise
// 连接数据库
mongoose.connect(config.mongo.uri, config.mongo.options).then(
  () => { logger.log('info', `mongodb connect success！`) },
  err => { logger.log('error', `mongodb connect Error, please retry`)}
)

/** router */
app.use(response_formatter('^/api'))
app.use(routers.routes()).use(routers.allowedMethods())

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
  // ip查询服务
  const ipnet = ctx.ip
  logger.log('info', `IP:${ipnet} ${ctx.method} ${ctx.url}`)
})

// response
app.use(async ctx => {
  // These keys(app.keys) may be rotated and are used when signing cookies with the { signed: true }
  ctx.cookies.set('name', 'zhoou', { signed: true })
  // ctx.body = "Hello, world!"
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