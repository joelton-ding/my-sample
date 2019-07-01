import uuidv1 from 'uuid/v1'
/**
 * Basic CURD DAO, to provider some basic function for DAO
 * @param  {Object} dao data access object
 * @param  {Class} ModelClass
 * @param  {boolean} debug true - to print debug info from DAO, default value is false
 */
export const crudDao = ({ copier, logger, getRepo, environment }) => (
  dao,
  ModelClass,
  debug = false
) => {
  let repo = getRepo(ModelClass, debug)
  let modelName = ModelClass.name
  let daoName = dao.constructor.name
  Object.assign(dao, {
    modelClass: () => ModelClass,
    /**
     * repository
     */
    repo,
    /**
     * query by id
     * @param  {string} id id
     */
    get: async id => {
      if (debug) {
        logger.debug(`Dao ${daoName}: Getting ${modelName} with id ${id}`)
      }
      return repo.findOne({ id })
    },
    /**
     * insert
     * @param  {Object} vo value object
     * @param  {Array} excludes=[] the properties excluded
     */
    create: async (vo, excludes = []) => {
      if (debug) {
        logger.debug(`Dao ${daoName}: Creating new ${modelName}`, vo)
      }
      let po = copier(new ModelClass(), vo, excludes)
      if (!po.id) {
        po.id = uuidv1()
      }
      await repo.insert(po)
      return repo.findOne({ id: po.id })
    },
    /**
     * update
     * @param  {Object} vo value object
     * @param  {Array} excludes=[] the properties excluded
     */
    update: async (vo, excludes = []) => {
      if (debug) {
        logger.debug(
          `Dao ${daoName}: Updating ${modelName} with id = ${vo.id}`,
          vo
        )
      }
      let po = copier(new ModelClass(), vo, excludes)
      await repo.update(po.id, po)
      return repo.findOne({ id: po.id })
    },
    /**
     * delete by id
     * @param  {string} id id
     */
    remove: async id => {
      if (debug) {
        logger.debug(`Dao ${daoName}: Removing ${modelName} with id = ${id}`)
      }
      return repo.delete({ id })
    },
    /**
     * query by Find Options
     * @param  {Object} options Find Options - please refer to http://typeorm.io/#/find-options
     */
    find: async options => {
      if (debug) {
        logger.debug(
          `Dao ${daoName}: Finding ${modelName} with options:`,
          options
        )
      }
      return repo.find(options)
    },
    /**
     * query one by Find Options
     * @param  {Object} options Find Options - please refer to http://typeorm.io/#/find-options
     */
    findOne: async options => {
      if (debug) {
        logger.debug(
          `Dao ${daoName}: Finding One ${modelName} with options:`,
          options
        )
      }
      return repo.findOne(options)
    }
  })
}

/**
 * Basic CURD service, to provider some basic methods for service
 * @param  {Object} service
 * @param  {Object} dao data access object
 * @param  {boolean} debug true - to print debug info from service, default value is false
 */
export const crudService = ({ copier, logger }) => (
  service,
  dao,
  debug = false
) => {
  if (!dao.modelClass) {
    throw Error('Only support framework enhanced Dao instance!')
  }
  let serviceName = service.constructor.name
  let modelName = dao.modelClass().name
  Object.assign(service, {
    dao,
    /**
     * call dao.get
     * @param  {string} id id
     */
    get: async id => {
      if (debug) {
        logger.debug(
          `Service ${serviceName}: Getting ${modelName} with id ${id}`
        )
      }
      return dao.get(id)
    },
    /**
     * call dao.create
     * @param  {Object} vo value object
     * @param  {Array} excludes=[] the properties excluded
     */
    create: async (vo, excludes = []) => {
      if (debug) {
        logger.debug(`Service ${serviceName}: Creating new ${modelName}`, vo)
      }
      return dao.create(vo, excludes)
    },
    /**
     * call dao.update
     * @param  {Object} vo value object
     * @param  {Array} excludes=[] the properties excluded
     */
    update: async (vo, excludes = []) => {
      if (debug) {
        logger.debug(
          `Service ${serviceName}: Updating ${modelName} with id = ${vo.id}`,
          vo
        )
      }
      return dao.update(vo, excludes)
    },
    /**
     * call dao.remove
     * @param  {string} id id
     */
    remove: async id => {
      if (debug) {
        logger.debug(
          `Service ${serviceName}: Removing ${modelName} with id = ${id}`
        )
      }
      return dao.remove(id)
    }
  })
}
