/**
 * @file This is a patch for the loadControllers in awilix-koa
 * to support load controllers from multi-folders
 */

import { rollUpState, findControllers, HttpVerbs } from 'awilix-router-core'
import { makeInvoker } from 'awilix-koa'
import Router from 'koa-router'
import compose from 'koa-compose'

/**
 * Loads controllers for the given pattern.
 *
 * @param pattern
 * @param opts
 */
export function loadControllers(patterns, opts) {
  const router = new Router()
  patterns.forEach(pattern => {
    findControllers(
      pattern,
      Object.assign({}, opts, { absolute: true })
    ).forEach(_registerController.bind(null, router))
  })
  return compose([router.routes(), router.allowedMethods()])
}

/**
 * Reads the config state and registers the routes in the router.
 *
 * @param router
 * @param ControllerClass
 */
function _registerController(router, stateAndTarget) {
  if (!stateAndTarget) {
    return
  }
  const { state, target } = stateAndTarget
  /* tslint:disable-next-line */
  const invoker = makeInvoker(target)
  const rolledUp = rollUpState(state)
  rolledUp.forEach((methodCfg, methodName) => {
    methodCfg.verbs.forEach(httpVerb => {
      let method = httpVerb.toLowerCase()
      if (httpVerb === HttpVerbs.ALL) {
        method = 'all'
      }
      router[method](
        methodCfg.paths,
        ...methodCfg.beforeMiddleware,
        invoker(methodName),
        ...methodCfg.afterMiddleware
      )
    })
  })
}
