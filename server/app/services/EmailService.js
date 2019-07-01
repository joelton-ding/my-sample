import nodemailer from 'nodemailer'

export default class EmailService {
  constructor({ crudService, logger, copier, environment }) {
    Object.assign(this, { logger, copier, environment })
    this.transporter = nodemailer.createTransport({
      host: this.environment['smtp.host'],
      port: this.environment['smtp.port'],
      secure: this.environment['smtp.secure'],
      auth: {
        user: this.environment['smtp.user'],
        pass: this.environment['smtp.pass']
      }
    })
  }

  sendMail(mailOptions) {
    // let mailOptions = {
    //   from: '"Fred Foo 👻" <noreply.system.app@gmail.com>', // sender address
    //   to: 'shenyangziyu@gmail.com, dingyingchor85@gmail.com', // list of receivers
    //   subject: 'Hello ✔', // Subject line
    //   // text: 'Hello world?', // plain text body
    //   html: '<b>Hello world?</b>' // html body
    // };

    // send mail with defined transport object
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message sent: %s', info.messageId)
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    })
  }
}
