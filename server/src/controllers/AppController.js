import { Route, Get } from '../fmk/decorators'
const fs = require('fs')
const path = require('path')
@Route('')
export default class {
  constructor({ privilegesMapping, logger, environment }) {
    Object.assign(this, {
      privilegesMapping,
      logger,
      environment
    })
  }
  @Get('/app')
  async app(ctx, next) {
    let appInfo = {}
    appInfo.envName = process.env.NODE_ENV
    appInfo.appName = process.env.npm_package_name
    appInfo.ver = process.env.npm_package_version
    // ctx.set('Content-Type', 'application/json; charset=utf-8')
    // ctx.body = JSON.stringify(appInfo)
    return appInfo
  }

  @Get('/*')
  async index(ctx, next) {
    let html = fs.readFileSync(path.resolve('../web/build/index.html'))
    // console.log(html)
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = html
  }
}
