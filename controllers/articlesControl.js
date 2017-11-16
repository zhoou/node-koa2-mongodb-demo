
// 获取文章列表
exports.GetArticleList = async (ctx, next) => {
  ctx.body = {
    lists: [{id: 1, name: '11'}, {id: 2, name: '21'}, {id: 3, name: '31'}]
  }
};