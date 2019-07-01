import { Route, Post } from '../../src/index'
import requestIp from 'request-ip'
import publicIp from 'public-ip'

@Route('/enquiry')
export default class {
  constructor({
    enquiryService,
    logger,
    environment,
    emailService,
    recaptchaService
  }) {
    Object.assign(this, {
      enquiryService,
      logger,
      environment,
      emailService,
      recaptchaService
    })
  }

  @Post('/')
  async add(ctx) {
    let enquiry = ctx.request.body
    let ipStr = requestIp.getClientIp(ctx.request)
    console.log(`clientIP: ${ipStr}`)
    if (ipStr.indexOf('::1') > -1) {
      ipStr = await publicIp.v4()
    }
    console.log(`clientIP: ${ipStr}`)
    let res = await this.recaptchaService.verify(enquiry.recaptchaValue, ipStr)
    console.log(`data: ${JSON.stringify(res.data)}`)
    if (!res || !res.data || !res.data.success) {
      return { message: 'False, Incorrect Recapcha.', status: false }
    }
    let emailBody = this.enquiryService.generateEnquiryEmail(enquiry)
    this.emailService.sendMail(emailBody)
    return this.enquiryService.save(enquiry)
    // return { career }
  }
}
