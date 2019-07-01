import { inspect } from 'util'
import axios from 'axios'
import uuidv4 from 'uuid/v4'
import { environment, isDev } from './env'

/**
 * Settings of RESTful client
 * @param {JSON} allow_method
 * @param {string} api_http_schema
 * @param {string} api_host
 * @param {string} api_prefix
 * @param {number} api_port
 * @param {string} header_request_id
 * @param {string} header_skip_auth
 * @param {boolean} debug
 */
export const RestSettings = {
  allow_method: { GET: 'get', POST: 'post', PUT: 'put', DELETE: 'delete' },
  api_http_schema: 'http://',
  api_host: environment || '',
  api_prefix: '/api/',
  api_port: 80,
  header_request_id: 'request-id',
  header_skip_auth: 'skip-auth',
  debug: false
}

const isDevENV = isDev()

/**
 * RestClient, provider the static method `call` to call RESTful API
 */
export class RestClient {
  /**
   * Make rest request
   * @param  {Endpoint} endpoint
   * @param  {JSON} uriParams for uri used
   * @param  {JSON} restBody support HttpMethod.POST & HTTPMethod.PUT only
   * @param  {JSON} headers put some headers needed, just like auth
   */
  static async call(endpoint, uriParams, restBody, headers) {
    try {
      let url = _getUrl(endpoint.uri, uriParams)

      let newHeaders = {
        [RestSettings.header_request_id]: uuidv4(),
        [RestSettings.header_skip_auth]: isDevENV
      }

      Object.assign(newHeaders, headers)

      let requestConfig = {
        url,
        method: endpoint.method,
        headers: newHeaders
      }
      if (
        endpoint.method === RestSettings.allow_method.POST ||
        endpoint.method === RestSettings.allow_method.PUT
      ) {
        requestConfig.data = restBody
      }

      if (RestSettings.debug) {
        console.log(
          'rest request:',
          inspect(requestConfig, { colors: true, compact: false })
        )
      }

      /**
       * @todo do something to transform response data
       */
      axios.interceptors.response.use(
        function(response) {
          // if (response.headers.hasOwnProperty('authorization')) {
          // }

          return response
        },
        error => {
          return Promise.reject(error)
        }
      )

      return await axios.request(requestConfig)
    } catch (error) {
      throw error
    }
  }
}

/**
 * @param {string} url format is [HttpMethod URI], e.g. get /next
 * @returns {Object} {} {method, uri}
 * @todo do better, dynamicaly use RestSettings.allow_method to parse Endpoint
 */
export const Endpoint = url => {
  // const allowedMethod = () => Object.values(RestSettings.allow_method).join('|')
  let results = /^(get|post|put|delete)\s+(.+)/gi.exec(url)
  if (!results || results.length !== 3) {
    throw Error(`Endpoint [${url}] is invalid, should be like [HttpMethod URI]`)
  }

  return {
    method: results[1].toLowerCase(),
    uri: results[2]
  }
}

/**
 * Get the url by uri & uriParams
 * @private
 * @param  {string} uri route with param
 * @param  {JSON} uriParams like urlsearchparam
 */
const _getUrl = (uri, uriParams) => {
  if (uriParams) {
    for (let k in uriParams) {
      uri = uri.replace(new RegExp(`{${k}}`, 'g'), uriParams[k])
    }
  }
  if (/^http/gi.test(uri)) {
    return uri
  }
  if (isDevENV) {
    return `${RestSettings.api_http_schema}${RestSettings.api_host}:${
      RestSettings.api_port
    }${RestSettings.api_prefix}${uri}`
  }
  // directly access service via docker container
  return `${RestClient.api_http_schema}${uri}`
}
