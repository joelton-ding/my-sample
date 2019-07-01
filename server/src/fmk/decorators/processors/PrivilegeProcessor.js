export const SLASH = '/'

let urlConverter = (routePath, subPath) => {
  let jsPath = subPath.replace(/{/g, ':').replace(/}/g, '')
  if (routePath === SLASH) {
    jsPath = jsPath.replace(/^\//g, '')
  }
  return jsPath
}
let generateFullUrl = (routePath, subPath) => {
  let fullPath = routePath + subPath
  if (fullPath.endsWith(SLASH)) {
    fullPath = fullPath.replace(/\/$/g, '') // remove all last slash
  }
  return fullPath
}

export const generateJsUrl = (currentRoutePath, currentSubPaths) => {
  currentSubPaths.forEach(pathObj => {
    pathObj.path = urlConverter(currentRoutePath, pathObj.path)
  })
}

export const generatePrivilegeMapping = (
  privilegeMapping,
  currentRoutePath,
  currentSubPaths
) => {
  currentSubPaths.forEach(pathObj => {
    let privilege = pathObj.privilege
    if (privilege && privilege.name) {
      let patterns = privilegeMapping.get(privilege.name)
      if (!patterns) {
        patterns = []
      }
      let fullPath = generateFullUrl(currentRoutePath, pathObj.path)
      let urlPattern = {
        pattern: fullPath,
        method: pathObj.httpVerb.toUpperCase(),
        description: privilege.description
      }
      patterns.push(urlPattern)
      privilegeMapping.set(privilege.name, patterns)
    }
  })
}
