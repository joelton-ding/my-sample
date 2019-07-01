import React from 'react'
import { observer } from 'mobx-react'
import Fade from 'react-reveal/Fade'
import { Form, Input, Row, Col, Select, notification } from 'antd'
// import { Form, Input, Row, Col, Button, Select } from 'antd'
import BackgroundEnquiry from '../../images/homepage-bg-enquiry.jpg'
import PropTypes from 'prop-types'
import ReCAPTCHA from 'react-google-recaptcha'
import EnquiryFormStore from '../../store/EnquiryFormStore'

const sectionStyleEnquiry = {
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${BackgroundEnquiry})`
}

const FormItem = Form.Item
const { TextArea } = Input

// const openNotificationWithIcon = type => {
//   notification[type]({
//     message: 'Your message was sent successfully.',
//     description: 'Thank you for your Inquiry.'
//   })
// }

const OPTIONS = [
  'Corporate Website',
  'PSD to HTML',
  'Microsite',
  'Landing Page',
  'SEO',
  'Domain & Hosting',
  'Mobile App'
]

const SectionEnquiryForm = props => {
  const recaptchaRef = React.createRef()
  let {
    state: { enquiry },
    actions: { AddEnquiry, OnFieldChange }
  } = EnquiryFormStore
  let formSubmit = e => {
    e.preventDefault()
    // const recaptchaValue = recaptchaRef.current.getValue()
    // if (!recaptchaValue) {
    //   notification['error']({
    //     message: 'Please check the recaptcha checkbox to continue.',
    //     description: 'Thank you for your Inquiry.'
    //   })
    //   return
    // }
    AddEnquiry(
      message => {
        recaptchaRef.current.reset()
        notification['success']({
          message,
          description: 'Thank you for your Inquiry.'
        })
      },
      message => {
        // recaptchaRef.current.reset()
        notification['error']({
          message,
          description: ''
        })
      }
    )
  }

  return (
    <div className="section-container" id={props['id']}>
      <div className="section backgroundImg" style={sectionStyleEnquiry}>
        <Form onSubmit={formSubmit}>
          <Fade>
            <div className="section-content">
              <h1 className="sub enquiry-form">
                Enquiry <div className="display-inline">Form</div>
              </h1>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }}>
                  <FormItem label="Name">
                    <Input
                      placeholder="Please enter your name."
                      onChange={event => {
                        OnFieldChange('name', event.target.value)
                      }}
                      value={enquiry.name}
                    />
                  </FormItem>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }}>
                  <FormItem label="Email">
                    <Input
                      placeholder="Please enter your email."
                      onChange={event => {
                        OnFieldChange('email', event.target.value)
                      }}
                      value={enquiry.email}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }}>
                  <FormItem label="Phone">
                    <Input
                      placeholder="Please enter your phone number."
                      onChange={event => {
                        OnFieldChange('phone', event.target.value)
                      }}
                      value={enquiry.phone}
                    />
                  </FormItem>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }}>
                  <FormItem label="Choose Services">
                    <Select
                      mode="multiple"
                      placeholder="Our Services"
                      onChange={value => {
                        OnFieldChange('service', JSON.stringify(value))
                      }}
                      style={{ width: '100%' }}
                    >
                      {OPTIONS.map(item => (
                        <Select.Option key={item}>{item}</Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24} className="message">
                  <FormItem label="Message">
                    <TextArea
                      rows={4}
                      placeholder="Message."
                      onChange={event => {
                        OnFieldChange('message', event.target.value)
                      }}
                      value={enquiry.message}
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <div className="home-recaptcha">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6Lf75p4UAAAAADw5uLxLRmJAlNxOaTSvABFa_aHD"
                      onChange={recaptchaValue => {
                        OnFieldChange('recaptchaValue', recaptchaValue)
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24} style={{ textAlign: 'center' }}>
                  <button className="btn-submit" size="large" type="submit">
                    Submit
                  </button>
                </Col>
              </Row>
            </div>
          </Fade>
        </Form>
      </div>
    </div>
  )
}

SectionEnquiryForm.propTypes = {
  id: PropTypes.string
}

export default observer(SectionEnquiryForm)
