import path from 'path'
import { Bristol } from 'bristol'
import mol from './logger-mol'
import { environment, isDev } from '../env'

/**
 * Bristol logger
 * severity: trace -> debug -> info -> warn -> error
 */
export const logger = new Bristol()

const logLevel = (environment && environment['LOG_LEVEL']) || 'debug'
/* istanbul ignore next */
if (logLevel !== 'off') {
  if (isDev()) {
    logger
      .addTarget('console')
      .withLowestSeverity(logLevel)
      .withFormatter(mol, {
        rootFolderName: process
          .cwd()
          .split(path.sep)
          .pop()
      })
  } else {
    logger
      .addTarget('console')
      .withLowestSeverity(logLevel)
      .withFormatter('syslog')
  }
}
