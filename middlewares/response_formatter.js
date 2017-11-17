/**
 * 在app.use(router)之前调用
 */
const response_formatter = (ctx) => {
  //如果有返回数据，将返回数据添加到data中
  if (ctx.body) {
    if (!ctx.body.code) {
      ctx.body = {
        code: 200,
        message: 'success',
        data: ctx.body
      }
    }
  } else {
    ctx.body = {
      code: 200,
      message: 'success'
    }
  }
}

const url_filter =(pattern) => {
  
    return async (ctx, next) => {
      const reg = new RegExp(pattern)
      // 通过正则的url进行格式化处理
      if (reg.test(ctx.originalUrl)) {
        // 先去执行路由
        await next()
        response_formatter(ctx)
      } else {
        ctx.body = {
          code: 404,
          message: 'Request URL Not Found!'
        }
      }
    }
}

module.exports = url_filter