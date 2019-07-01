import axios from 'axios'
import AppStorage from '../appglobal/AppStorage'
let GetLoc = () => {
  // return `https://bigbangdesign.co`
  if (window.location.hostname.indexOf('localhost') > -1) {
    return 'http://localhost:5000/'
    // return 'https://bigbangdesign.co/api/'
  } else {
    return `//${window.location.hostname}/api/`
  }
}
// const URI_PREFIX = isProduction
//   ? 'http://43.229.85.205:5080/api/'
//   : 'http://localhost:5000/api/'
const ApiConfig = {}
ApiConfig.client = axios.create({
  baseURL: GetLoc(),
  timeout: 1000
})
ApiConfig.request = (config) =>{
  let token = AppStorage.get(AppStorage.APP_TOKEN)
  if (token) {
    ApiConfig.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete ApiConfig.client.defaults.headers.common['Authorization'];
  }
  return ApiConfig.client.request(config)
}
export default ApiConfig
