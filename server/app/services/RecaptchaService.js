import { RestClient, Endpoint } from '../../src'
export default class RecaptchaService {
  constructor({ logger, copier, environment }) {
    Object.assign(this, { logger, copier, environment })
  }

  async verify(recapcha, ipAddr) {
    return RestClient.call(
      Endpoint(
        `GET https://google.com/recaptcha/api/siteverify?secret=6Lf75p4UAAAAAJIPPxlw6DK_kr8FERoB1erjTHHh&response=${recapcha}&remoteip=${ipAddr}`
      )
    )
  }
}
