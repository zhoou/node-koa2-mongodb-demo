
const Articles = require('../schemas/articles')
const authsControl = require('./authsControl')

// get article list
exports.GetArticleLists = async (ctx, next) => {
  // auth check
  await authsControl.Verify(ctx, next)
  if (ctx.body && ctx.body.code === 401) {
    return false;
  }

  const { limit, pageIndex, startDate, endDate } = ctx.request.body;
  // coding...
  ctx.body = {
    lists: [{id: 1, name: '11'}, {id: 2, name: '21'}, {id: 3, name: '31'}]
  }
};

// create new article
exports.CreateArticle = async (ctx, next) => {
  // auth check
  await authsControl.Verify(ctx, next)
  if (ctx.body && ctx.body.code === 401) {
    return false;
  }

  const item = ctx.request.body;

  const article = new Articles ({
    title: item.title,
    author: item.author,
    body: item.body,
    hidden: item.hidden
  })

  await article.save()
  ctx.body = {
    id: article.id
  }
}

exports.GetArticleById = async(ctx, next) => {
  // auth check
  await authsControl.Verify(ctx, next)
  if (ctx.body && ctx.body.code === 401) { // 未授权
    return ;
  }

  const { id } = ctx.request.query

  await Articles.findById(id, (err, article) => {
    if (err) return err

    ctx.body = article
  });
}