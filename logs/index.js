// 日志记录 log
const winston = require('winston')

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: 'error' }),
    new (winston.transports.File)({
      filename: './logs/logs.log',
      level: 'info'
    })
  ]
});

module.exports = logger
