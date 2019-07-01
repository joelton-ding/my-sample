import React from 'react'
import { Grid, Row, Col, Form, Modal, Button, FormGroup } from 'react-bootstrap'
import ReCAPTCHA from 'react-google-recaptcha'
import Fade from 'react-reveal/Fade'
import SubscriberStore from '../../store/SubscriberStore'
import { observer } from 'mobx-react'

const Email = () => {
  const recaptchaRef = React.createRef()
  let {
    state: { subscriber, subscribeModal },
    actions: { EmailOnChange, AddSubscriber, OnFieldChange }
  } = SubscriberStore
  let formSubmit = e => {
    e.preventDefault()
    const recaptchaValue = recaptchaRef.current.getValue()
    if (!recaptchaValue) {
      alert('Please check the recaptcha checkbox to continue.')
      return
    }
    AddSubscriber(() => {
      recaptchaRef.current.reset()
    })
  }

  const handleCancel = () => {
    SubscriberStore.actions.ShowSubscribeModal(false)
  }
  return (
    <div className="home-email">
      <Grid>
        <Row>
          <Col md={12}>
            <Modal show={subscribeModal.visible} onHide={handleCancel}>
              <Modal.Header closeButton>
                <Modal.Title />
              </Modal.Header>
              <Modal.Body>{subscribeModal.message}</Modal.Body>
              <Modal.Footer>
                <Button onClick={handleCancel}>Close</Button>
              </Modal.Footer>
            </Modal>
            <Fade>
              <Form onSubmit={formSubmit}>
                <h1>Email Alerts</h1>
                <p>
                  Welcome to Biolidics Limited’s email alert service, where we
                  will automatically send you updates on the Company once
                  registration is successfully completed
                </p>
                <div className="form-group">
                  <div className="home-email-input">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email address here"
                      required
                      value={subscriber.email}
                      onChange={event => {
                        EmailOnChange(event.target.value)
                      }}
                    />
                  </div>
                  <div className="home-eamil-button">
                    <button type="submit">
                      <img
                        src={require('../../images/icon-email.svg')}
                        alt="Subscribe"
                      />{' '}
                      Subscribe
                    </button>
                  </div>
                </div>
                <div style={{ clear: 'both' }} />
                <FormGroup>
                  <div className="home-recaptcha">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6Lf75p4UAAAAADw5uLxLRmJAlNxOaTSvABFa_aHD"
                      onChange={recaptchaValue => {
                        OnFieldChange('recaptchaValue', recaptchaValue)
                      }}
                    />
                  </div>
                </FormGroup>
              </Form>
            </Fade>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

export default observer(Email)
