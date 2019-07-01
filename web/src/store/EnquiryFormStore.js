import { observable, action, toJS } from 'mobx'
import ApiConfig from '../api/ApiConfig'
const state = observable({
  enquiry: {
    name: '',
    email: '',
    phone: '',
    service: [],
    message: ''
  }
})
let actions = {}
actions.OnFieldChange = action((fieldName, fieldValue) => {
  state.enquiry[fieldName] = fieldValue
})
actions.AddEnquiry = action((successCbs, failCb) => {
  let enquiry = toJS(state.enquiry)
  let config = {
    method: 'post',
    url: '/common/enquiry',
    // url: '/enquiry',
    data: enquiry
  }

  if (!enquiry.name) {
    failCb('Name is Required!')
    return
  }
  var re = /\S+@\S+\.\S+/
  if (!enquiry.email) {
    failCb('Email is Required!')
    return
  }
  if (!re.test(enquiry.email)) {
    failCb('Email is not in correct format!')
    return
  }
  if (!enquiry.phone) {
    failCb('Phone is Required!')
    return
  }
  if (enquiry.service.length === 0) {
    failCb('Services is Required!')
    return
  }
  if (!enquiry.recaptchaValue) {
    // notification['error']({
    //   message: 'Please check the recaptcha checkbox to continue.',
    //   description: 'Thank you for your Inquiry.'
    // })
    failCb('Please check the recaptcha checkbox to continue!')
    return
  }
  ApiConfig.request(config)
    .then(res => {
      // console.log('refreshToken finished..');
      console.log(res.data)
      if (res.data && res.data.message) {
        successCbs(res.data.message)
      } else {
        failCb(res.data.message)
      }
    })
    .catch(error => {
      failCb('System Error')
      console.error(error)
    })
})

export default { state, actions }
