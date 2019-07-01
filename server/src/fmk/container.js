import {
  asValue,
  asFunction,
  asClass,
  createContainer,
  Lifetime,
  InjectionMode
} from 'awilix'
import path from 'path'
import { logger } from './logger'
import { ConnectionManager } from './db/ConnectionManager'
import { environment } from './env'
import { copier } from './db/ObjectCopier'
import { crudDao, crudService } from './db/CRUD'
import { routes, privilegesMapping } from './decorators'

const modulesToLoad = [
  // Services should be scoped to the request.
  // This means that each request gets a separate instance
  // of a service/dao.
  ['services/*.js', Lifetime.SCOPED],
  ['daos/*.js', Lifetime.SCOPED]
]
const registerModules = container => {
  ;[
    path.resolve(environment['BASE_DIR']),
    path.resolve(__dirname, '..')
  ].forEach(dir => {
    container.loadModules(modulesToLoad, {
      cwd: dir,
      // Example: registers `services/TodoService.js` as `todoService`
      formatName: 'camelCase',
      register: asClass
    })

    logger.trace(
      'Load modules from: ',
      modulesToLoad.map(m => path.resolve(dir, m[0]))
    )
  })
}

/**
 * Configures a new container.
 *
 * @return {Object} The container.
 */
export function configureContainer() {
  const opts = {
    // Create the container and set the injectionMode to PROXY (which is also the default).
    injectionMode: InjectionMode.PROXY
  }
  const container = createContainer(opts).register({
    logger: asValue(logger),
    connectionManager: asClass(ConnectionManager).singleton(),
    environment: asValue(environment),
    copier: asFunction(copier).singleton(),
    crudDao: asFunction(crudDao).scoped(),
    crudService: asFunction(crudService).scoped(),
    koaRoutes: asValue(routes),
    privilegesMapping: asValue(privilegesMapping)
  })

  registerModules(container)

  container.resolve('connectionManager')

  return container
}
