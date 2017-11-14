const mongoose = require('mongoose')
const config	 = require('../config')

mongoose.Promise = global.Promise

// 连接数据库
mongoose.connect(config.mongo.uri, config.mongo.options).then(
  () => { console.log(`mongodb connect success！`) },
  err => { console.log(`mongodb connect Error, please retry`)}
)
