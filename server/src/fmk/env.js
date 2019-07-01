import yenv from 'yenv'
import properties from 'properties'
import { keyblade } from 'keyblade'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const DEFAULT_VALUE = {
  'server.port': 5000
}

const yaml = yenv('project.yaml')

let configs = Object.assign(DEFAULT_VALUE, yaml)

export let environment = null

export const isDev = () => {
  if (environment) {
    return environment['env.name'] === 'DEV'
  }
  return process.env.NODE_ENV !== 'production'
}

export const loadEnv = cb => {
  properties.parse(
    yaml['DOCKER_CONFIG_FILE'],
    {
      path: true,
      namespaces: false,
      sections: false,
      variables: false,
      include: false
    },
    (error, prop) => {
      if (error) return console.error(error)
      configs = Object.assign(configs, prop)
      environment = keyblade(configs, {
        message: key =>
          `[yenv] Key "${key}" not found in the loaded environment`,
        logBeforeThrow: message => console.error(message)
      })
      cb(environment)
    }
  )
}
