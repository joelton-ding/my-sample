import util from 'util'
import chalk from 'chalk'
const logUtil = require('bristol').Bristol.logUtil

// shortens the file name to exclude any path before the project folder name
// @param path: file path string. e.g. /home/mark/myproj/run.js
// @param rootFolderName: root folder for the project. e.g. "myproj"
// @return the shortened file path string
function truncFilename(path, rootFolderName) {
  // bail if a string wasn't provided
  if (typeof path !== 'string') {
    return path
  }

  var index = path.indexOf(rootFolderName)
  if (index > 0) {
    return path.substring(index + rootFolderName.length + 1)
  } else {
    return path
  }
}

// retruns the colorized timestamp string
function getTimestampString(date) {
  var hour = date
    .getHours()
    .toString()
    .padStart(2, '0')
  var minute = date
    .getMinutes()
    .toString()
    .padStart(2, '0')
  var second = date
    .getSeconds()
    .toString()
    .padStart(2, '0')
  var ms = date
    .getMilliseconds()
    .toString()
    .padStart(3, '0')

  return chalk.dim(`${hour}:${minute}:${second}:${ms}`)
}

const severityMap = {
  error: 'bgRed',
  warn: 'bgYellow',
  info: 'white',
  debug: 'white',
  trace: 'white'
}

// returns the colorized text for the given severity level
function getColorSeverity(severity) {
  // get the color associated with the severity level
  const color = severityMap[severity] || 'white'
  return chalk[color].bold(severity.toUpperCase())
}

const ScopeColor = {
  _colors: [
    'red',
    'yellow',
    'green',
    'blue',
    'magenta',
    'cyan',
    'white',
    'gray'
  ],
  _prevColor: 0,
  _scopeColorMap: {},

  get(scope) {
    if (this._scopeColorMap[scope]) {
      return this._scopeColorMap[scope]
    } else {
      var color = this._colors[this._prevColor++ % this._colors.length]
      this._scopeColorMap[scope] = color
      return color
    }
  }
}

// returns the colorized scope string
function getScopeString(scope) {
  return chalk[ScopeColor.get(scope)].underline.bold(scope)
}

// the formatter to export
module.exports = (options, severity, date, elems) => {
  const objectDepth = options.objectDepth
  const rootFolderName = options.rootFolderName

  const indent = '\n  →  '
  const sanitize = str => {
    if (str) str = str.replace(/\n/g, indent)
    return str
  }

  let title = ''
  let msg = ''

  let obj = elems[elems.length - 1]
  if (obj.scope) {
    title = ' ' + getScopeString(obj.scope)
    elems.pop()
  }
  obj = {}

  elems.forEach((elem, idx) => {
    let str = logUtil.nonObjToString(elem)
    if (str !== null) {
      title += ' ' + chalk.blue(str)
    } else if (elem instanceof Error) {
      title += ' <Err: ' + elem.message + '>'
      logUtil.safeMerge(obj, {
        StackTrace: indent + sanitize(elem.stack)
      })
    } else if (elem instanceof Date) {
      title += ' ' + getTimestampString(elem)
    } else if (typeof elem === 'object') {
      if (elem.file && elem.line) {
        title += chalk.dim(
          ` (${truncFilename(elem.file, rootFolderName)}:${elem.line})`
        )
        delete elem.file
        delete elem.line
      }

      if (Object.keys(elem).length > 0) {
        obj[idx] = sanitize(
          '\n' +
            util.inspect(elem, {
              colors: true,
              compact: false,
              depth: objectDepth
            })
        )
      }
    }
  })

  msg = `${getTimestampString(date)} ${getColorSeverity(severity)}${title}`

  logUtil.forEachObj(obj, (key, val) => {
    if (key === 'StackTrace') {
      msg += `${indent}${key}: ${val}`
    } else {
      msg += val
    }
  })

  return msg
}
