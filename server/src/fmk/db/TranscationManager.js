import { getManager } from 'typeorm'
import { asFunction } from 'awilix'

export const transactionManager = async (ctx, next) => {
  return getManager().transaction(async transactionalEntityManager => {
    ctx.state.container.register({
      getRepo: asFunction(({ logger }) => (model, debug = false) => {
        if (debug) {
          logger.debug(`TransactionManager: Getting repo for ${model.name}`)
        }
        return transactionalEntityManager.getRepository(model)
      })
    })
    return next()
  })
}
