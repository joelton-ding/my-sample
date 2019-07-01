import 'reflect-metadata'
import { loadEnv } from '../env'

loadEnv(env => {
  let logger = require('../logger').logger
  require('../server')
    .createServer()
    .then(
      app =>
        app.listen(env['server.port'], () => {
          const mode = env.NODE_ENV
          logger.debug(
            `Server listening on ${env['server.port']} in ${mode} mode`
          )
        }),
      err => {
        logger.error('Error while starting up server', err)
        process.exit(1)
      }
    )
})
