import path from 'path'
import glob from 'glob'

export const loader = (_path, callback) => {
  glob.sync(_path).forEach(f => {
    callback(path.resolve(f))
  })
}
