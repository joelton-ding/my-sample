import Enquiry from '../entities/Enquiry'
export default class EnquiryService {
  constructor({ crudService, logger, copier, enquiryDao, environment }) {
    Object.assign(this, { logger, copier, environment })
    crudService(this, enquiryDao, true)
  }

  async find(params) {
    return this.dao.find(params)
  }

  async save(params) {
    // let res = await this.dao.find({ email: params.email })
    // if (Array.isArray(res) && res.length > 0) {
    //   return { message: 'Your resume already be submitted!', status: false }
    // }
    let po = this.copier(new Enquiry(), params)
    await this.dao.create(po)
    return {
      message: 'Thank you for your interest,we will contact you shortly!',
      status: true
    }
  }

  generateEnquiryEmail(params) {
    let mailOptions = {
      from: this.environment['app.alert.email.sender'], // sender address
      to: this.environment['app.alert.email.inquiry'], // list of receivers
      subject: 'New Enquiry Received', // Subject line
      // text: 'Hello world?', // plain text body
      html: `<table style="width: 100%; border-collapse: collapse; font-family: 'arial', sans-serif">
          <thead>
            <tr>
              <th style="padding: 5px; border: 1px solid #ccc; font-weight: bold; font-size: 20px; text-align: left" colspan="2">New Enquiry</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 5px; border: 1px solid #ccc; font-weight: bold;">Name:</td>
              <td style="padding: 5px; border: 1px solid #ccc;">${params.name ||
                '-'}</td>
            </tr>
            <tr>
              <td style="padding: 5px; border: 1px solid #ccc; font-weight: bold;">Contact:</td>
              <td style="padding: 5px; border: 1px solid #ccc;">${params.phone ||
                '-'}</td>
            </tr>
            <tr>
              <td style="padding: 5px; border: 1px solid #ccc; font-weight: bold;">Email:</td>
              <td style="padding: 5px; border: 1px solid #ccc;">${params.email ||
                '-'}</td>
            </tr>
            <tr>
              <td style="padding: 5px; border: 1px solid #ccc; font-weight: bold;">Service:</td>
              <td style="padding: 5px; border: 1px solid #ccc;">${params.service ||
                '-'}</td>
            </tr>            
            <tr>
              <td style="padding: 5px; border: 1px solid #ccc; font-weight: bold;">Message: </td>
              <td style="padding: 5px; border: 1px solid #ccc;">${params.message ||
                '-'}</td>
            </tr>
        </tbody>
      </table>
      `
      // `<b>Name: ${params.name}</b><br>
      // <b>Contact: ${params.contact}</b><br>
      // <b>Email: ${params.email}</b><br>` +
      // `<b>Position: ${params.position}</b><br>
      // <b>Agree To Explore: ${params.agreeExplore}</b><br>` +
      // `<b>Resume: ${this.environment['host.download.link']}${params.resumePath}</b><br>` +
      // `<b>Cover Letter: ${this.environment['host.download.link']}${params.coverLatterPath}</b><br>` +
      // `<b>Message: ${params.message}</b><br>`
    }
    return mailOptions
  }
}
