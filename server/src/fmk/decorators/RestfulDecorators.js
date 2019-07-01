import { addRoute, addHttpVerbs, updateState, HttpVerbs } from 'awilix-koa'
import { loader } from '../utils'

let decoratorNames = {
  [HttpVerbs.POST]: 'Post',
  [HttpVerbs.PUT]: 'Put',
  [HttpVerbs.GET]: 'Get',
  [HttpVerbs.DELETE]: 'Delete'
}

let processors = []

loader(`${__dirname}/processors/*Processor.js`, f => {
  let { processor } = require(f)
  if (processor) {
    processors.push(processor)
  }
})

let urlConverter = subPath => {
  return subPath.replace(/{/g, ':').replace(/}/g, '')
}

const verbs = (path, httpVerb, parameter) => (target, name, descriptor) => {
  if (name === void 0) {
    name = null
  }

  /**
   * @todo
   */
  // if (parameter && parameter.ruleName) {
  // }
  updateState(target, state => addHttpVerbs(state, name, [httpVerb]))
  updateState(target, state => addRoute(state, name, urlConverter(path)))

  processors.forEach(processor => {
    processor(decoratorNames[httpVerb], path, parameter, {
      target,
      name,
      descriptor
    })
  })
}

export const Post = (path, parameter) => verbs(path, HttpVerbs.POST, parameter)

export const Put = (path, parameter) => verbs(path, HttpVerbs.PUT, parameter)

export const Get = (path, parameter) => verbs(path, HttpVerbs.GET, parameter)

export const Delete = (path, parameter) =>
  verbs(path, HttpVerbs.DELETE, parameter)

export const Route = (path, parameter) => (target, name, descriptor) => {
  if (name === void 0) {
    name = null
  }

  updateState(target, state => addRoute(state, name, path))

  processors.forEach(processor => {
    processor('Route', path, parameter, { target, name, descriptor })
  })
}
