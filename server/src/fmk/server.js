import * as http from 'http'
import path from 'path'
import Koa from 'koa'
// import cors from '@koa/cors'
import respond from 'koa-respond'
// import bodyParser from 'koa-bodyparser'
// import compress from 'koa-compress'
import { scopePerRequest } from 'awilix-koa'
import cors from '@koa/cors'
import koaBody from 'koa-body'
// import serve from 'koa-static'
// import mount from 'koa-mount'
import { loadControllers } from './awilix-koa-controller'

import { loader } from './utils'
import { environment } from './env'
import { logger } from './logger'
import { configureContainer } from './container'
import { notFoundHandler } from './middleware/not-found'
import { errorHandler } from './middleware/error-handler'
import { txManager } from './middleware/transaction'
import { jsonResponse } from './middleware/json-response'
// import eventManager from './eventManager'

/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Promise<http.Server>} The configured app.
 */
export async function createServer() {
  logger.debug('Creating server...')
  logger.info(`Base dir: ${path.resolve(environment['BASE_DIR'])}`)

  const cwd = [
    path.resolve(environment['BASE_DIR']),
    path.resolve(__dirname, '..')
  ]
  const controllerPaths = cwd.map(dir =>
    path.resolve(dir, './controllers/*.js')
  )
  const formPaths = cwd.map(dir => path.resolve(dir, './controllers/form/*.js'))

  const app = new Koa()
  // Container is configured with our services and whatnot.
  const container = (app.container = configureContainer())
  // let webDir = path.resolve('server', '../../web/build')
  // console.log(`-----------${webDir}---------------`)

  app
    // Top middleware is the error handler.
    .use(errorHandler)
  // Compress all responses.
  // .use(compress())
  // Adds ctx.ok(), ctx.notFound(), etc..
  // .use(mount('/', serve(environment['PUBLIC_DIR'])))
  // app.use(mount('/', serve(webDir)))
  app
    .use(respond()) // { autoMessage: false }
    // Handles CORS.
    // .use(cors())
    // Parses request bodies.
    .use(koaBody({ multipart: true }))
    .use(cors())
    // get authorization from header and set to ctx.auth
    // Creates an Awilix scope per request. Check out the awilix-koa
    // docs for details: https://github.com/jeffijoe/awilix-koa
    .use(scopePerRequest(container))
  // add tx support for each request
  if (environment['HasDB']) {
    app.use(txManager)
  }

  app.use(jsonResponse)
  // Load routes (API "controllers")
  app
    .use(loadControllers(controllerPaths))

    // Default handler when nothing stopped the chain.
    .use(notFoundHandler)

  // Load form definition
  formPaths.forEach(p => {
    loader(p, f => {
      require(f)
    })
  })

  logger.trace(
    'Load [controllers & forms] from:',
    [...controllerPaths, ...formPaths].map(p => path.resolve(process.cwd(), p))
  )

  // eventManager.init(container)
  // Creates a http server ready to listen.
  const server = http.createServer(app.callback())

  // Add a `close` event listener so we can clean up resources.
  server.on('close', () => {
    // You should tear down database connections, TCP connections, etc
    // here to make sure Jest's watch-mode some process management
    // tool does not release resources.
    logger.debug('Server closing, bye!')
  })

  logger.debug('Server created, ready to listen', { scope: 'startup' })
  return server
}
