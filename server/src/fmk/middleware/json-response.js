// import { logger } from '../logger'

export const jsonResponse = async (ctx, next) => {
  let ctlVal = await next()
  if (ctlVal && !ctx.type) {
    ctx.type = 'application/json; charset=utf-8'
    ctx.status = 200
    ctx.res.end(JSON.stringify(ctlVal))
  }
  // ctx.redirect('/')
}
