import { DefaultNamingStrategy } from 'typeorm'
import decamelize from 'decamelize'

export class NamingStrategy extends DefaultNamingStrategy {
  get name() {
    return 'iBackendNamingStrategy'
  }

  tableName(targetName, userSpecifiedName) {
    return userSpecifiedName || decamelize(targetName)
  }

  columnName(propertyName, customName, embeddedPrefixes) {
    return decamelize(
      embeddedPrefixes.concat(customName || propertyName).join('_')
    )
  }

  columnNameCustomized(customName) {
    return customName
  }

  relationName(propertyName) {
    return decamelize(propertyName)
  }
}
