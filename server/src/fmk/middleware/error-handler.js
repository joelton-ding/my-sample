import { logger } from '../logger'
import { environment } from '../env'

/**
 * Error handler middleware.
 * Uses status code from error if present.
 */
export async function errorHandler(ctx, next) {
  try {
    await next()
  } catch (err) {
    /* istanbul ignore next */
    ctx.status = err.statusCode || 500
    ctx.body = err.toJSON
      ? err.toJSON()
      : environment['EMIT_STACK_TRACE']
      ? { message: err.message, ...err }
      : { message: err.message }
    /* istanbul ignore next */
    if (!environment['EMIT_STACK_TRACE']) {
      delete ctx.body.stack
    }
    logger.error('Error in request', err)
  }
}
