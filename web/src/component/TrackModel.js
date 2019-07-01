import React from 'react'
import {
  Col,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  Modal
} from 'react-bootstrap'
import { observer } from 'mobx-react'
import ReCAPTCHA from 'react-google-recaptcha'
import PropTypes from 'prop-types'

const TrackModel = props => {
  const recaptchaRef = React.createRef()
  let formSubmit = e => {
    e.preventDefault()
    const recaptchaValue = recaptchaRef.current.getValue()
    if (!recaptchaValue) {
      alert('Please check the recaptcha checkbox to continue.')
      return
    }
    console.log(recaptchaValue)
    if (props.handleSubmit)
      props.handleSubmit(() => {
        recaptchaRef.current.reset()
        props.handleCancel(false)
      })
  }
  return (
    <Modal
      show={props.visible}
      onHide={() => {
        props.handleCancel(false)
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Please enter your details below to download the PDF file.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formSubmit} horizontal>
          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={4}>
              Your Name in Full<span>*</span> :
            </Col>
            <Col sm={8}>
              <FormControl
                type="text"
                placeholder=""
                value={props.track.name || ''}
                onChange={e => {
                  props.OnFieldChange('name', e.target.value)
                }}
                required
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={4}>
              <strong>
                Email Address <span>*</span>
              </strong>{' '}
              :
            </Col>
            <Col sm={8}>
              <FormControl
                type="email"
                placeholder=""
                value={props.track.email || ''}
                onChange={e => {
                  props.OnFieldChange('email', e.target.value)
                }}
                required
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalCompany">
            <Col componentClass={ControlLabel} sm={4}>
              Organization<span>*</span> :
            </Col>
            <Col sm={8}>
              <FormControl
                type="text"
                placeholder=""
                value={props.track.company || ''}
                onChange={e => {
                  props.OnFieldChange('company', e.target.value)
                }}
                required
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPosition">
            <Col componentClass={ControlLabel} sm={4}>
              Country<span>*</span>:
            </Col>
            <Col sm={8}>
              <FormControl
                componentClass="select"
                placeholder="Select Country"
                value={props.track.country || ''}
                onChange={e => {
                  props.OnFieldChange('country', e.target.value)
                }}
                required
              >
                <option value="">Select</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Africa Except Egypt">Africa Except Egypt</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Baltic States">Baltic States</option>
                <option value="Belgium">Belgium</option>
                <option value="Bosnia">Bosnia</option>
                <option value="Brunei Darussalam">Brunei Darussalam</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burma">Burma</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Canada">Canada</option>
                <option value="China">China</option>
                <option value="Commonwealth Of Independent States">
                  Commonwealth Of Independent States
                </option>
                <option value="Croatia">Croatia</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Egypt">Egypt</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Greece">Greece</option>
                <option value="Gulf States">Gulf States</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Ireland">Ireland</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Korea">Korea</option>
                <option value="Lao">Lao</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Malta">Malta</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Mexico">Mexico</option>
                <option value="Middle East">Middle East</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Morocco">Morocco</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherlands">Netherlands</option>
                <option value="New Zealand">New Zealand</option>
                <option value="North Africa">North Africa</option>
                <option value="Norway">Norway</option>
                <option value="Other Central America">
                  Other Central America
                </option>
                <option value="Other Pacific Countries">
                  Other Pacific Countries
                </option>
                <option value="Pakistan">Pakistan</option>
                <option value="Philippines">Philippines</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Romania">Romania</option>
                <option value="Russian Federation">Russian Federation</option>
                <option value="Serbia">Serbia</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="South Africa">South Africa</option>
                <option value="South America">South America</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syria">Syria</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Thailand">Thailand</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States Of America">
                  United States Of America
                </option>
                <option value="Vietnam">Vietnam</option>
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPosition">
            <Col componentClass={ControlLabel} sm={4}>
              Job Position :
            </Col>
            <Col sm={8}>
              <FormControl
                componentClass="select"
                placeholder="Select Job Position"
                value={props.track.job || ''}
                onChange={e => {
                  props.OnFieldChange('job', e.target.value)
                }}
              >
                <option value="">Select</option>
                <option value="Executive">Executive</option>
                <option value="Non-Executive">Non-Executive</option>
                <option value="Others">Others</option>
                <option value="Entrepreneur">Entrepreneur</option>
                <option value="Senior Management">Senior Management</option>
                <option value="CEO/COO">CEO/COO</option>
                <option value="CFO">CFO/CTO/CMO</option>
                <option value="Director/VP">Director/VP</option>
                <option value="Manager">Manager</option>
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={4} sm={8}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Lc9MIcUAAAAACyQcJmmb2kHGr2qEAsKw2nNTKd1"
                onChange={recaptchaValue => {
                  props.OnFieldChange('recaptchaValue', recaptchaValue)
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={4} sm={8}>
              <Button className="submit-app" type="submit">
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.handleCancel(false)
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
TrackModel.propTypes = {
  visible: PropTypes.bool,
  track: PropTypes.object,
  handleCancel: PropTypes.func,
  handleSubmit: PropTypes.func,
  OnFieldChange: PropTypes.func
}
export default observer(TrackModel)
