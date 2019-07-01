import { generateJsUrl, generatePrivilegeMapping } from './PrivilegeProcessor'
let currentSubPaths = []
let currentRoutePath = ''

export const routes = {}
export const privilegesMapping = new Map()

export const processor = (decoratorName, path, parameter) => {
  if (decoratorName === 'Route') {
    currentRoutePath = path
    if (!routes[path]) {
      routes[path] = []
    }
    generatePrivilegeMapping(
      privilegesMapping,
      currentRoutePath,
      currentSubPaths
    )
    generateJsUrl(currentRoutePath, currentSubPaths)
    routes[path].push(...currentSubPaths)
    currentSubPaths = []
  } else {
    let obj = { httpVerb: decoratorName, path }
    if (parameter && parameter.ruleName) {
      obj.ruleName = parameter.ruleName
    }
    if (parameter && parameter.privilege) {
      obj.privilege = parameter.privilege
    }
    currentSubPaths.push(obj)
  }
}
