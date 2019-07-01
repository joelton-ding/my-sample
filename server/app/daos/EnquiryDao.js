import Enquiry from '../entities/Enquiry'

export default class EnquiryDao {
  constructor({ crudDao, copier, logger }) {
    Object.assign(this, { copier, logger })
    crudDao(this, Enquiry, true)
  }

  prepareWhereClause(options) {
    let where = ' 1 = 1'
    if (options.os) {
      where = where + ' and project.os = :os'
    }
    if (options.env) {
      where = where + ' and project.name like :envField'
      options.envField = `%${options.env}`
    } else {
      where =
        where +
        " and project.name not like '%SIT' and project.name not like '%UAT'"
    }
    return where
  }

  async allProjects(options) {
    return this.repo
      .createQueryBuilder('project')
      .select('max(project.createdDate)', 'createdDate')
      .addSelect('project.name', 'name')
      .where(this.prepareWhereClause(options), options)
      .groupBy('project.name')
      .getRawMany()
  }

  async getLatestProj(options) {
    return this.repo
      .createQueryBuilder('project')
      .where('project.os = :os and name = :name', options)
      .orderBy('project.createdDate', 'DESC')
      .take(1)
      .getOne()
  }
}
