const apiRouter = require('koa-router')()

apiRouter.prefix('/api')

const routers = []
for (var router of routers) {
  apiRouter.use(router.routes(), router.allowedMethods())
}

module.exports = apiRouter