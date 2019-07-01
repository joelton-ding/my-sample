import { createConnection, getConnection } from 'typeorm'
import { NamingStrategy } from './NamingStrategy'
import path from 'path'

export class ConnectionManager {
  constructor({ logger, environment }) {
    this.logger = logger

    const entityPath = [
      path.resolve(environment['BASE_DIR']),
      path.resolve(__dirname, '../../')
    ].map(dir => path.resolve(dir, './entities/*.js'))
    // let dbOption = {
    //   type: "sqlite",
    //   database: "temp/sqlitedb.db"
    // }
    let dbOption = {
      type: 'mysql',
      host: environment['db.mysql.host.ip'],
      port: environment['db.mysql.host.port'],
      username: environment['db.mysql.user'],
      password: environment['db.mysql.password'],
      database: environment['Database'],
      synchronize: environment['Synchronize'],
      entities: entityPath,
      logging: environment['SQL_Logging'],
      namingStrategy: new NamingStrategy()
    }
    createConnection(dbOption)
      .then(conn => {
        logger.trace('Load [entities] from:', entityPath)
        logger.debug(
          `Database  Connected! ${environment['db.mysql.host.ip']}:${
            environment['db.mysql.host.port']
          }`
        )
      })
      .catch(err => {
        logger.error(err)
      })
  }

  get conn() {
    return getConnection()
  }
}
