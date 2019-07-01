import React from 'react'
import Fade from 'react-reveal/Fade'
import BackgroundThree from '../../images/homepage-bg-3.jpg'
import PropTypes from 'prop-types'

const sectionStyle3 = {
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${BackgroundThree})`
}

const SectionContactUs = props => {
  return (
    <div className="section-container" id={props['id']}>
      <div className="section backgroundImg" style={sectionStyle3}>
        <Fade>
          <div className="section-content">
            <h1 className="sub">
              Contact <div className="display-inline">Us</div>
            </h1>
            <div className="section-content-inner multimedia-design">
              <p>
                <strong>CONNECT WITH US</strong>
              </p>
              <p>
                37 Tannery Lane
                <br />
                #06-05 Tannery House
                <br />
                Singapore 347790
                <br />
                <br />
                Email:{' '}
                <a href="mailto:alex.tan@8prasia.com">alex.tan@8prasia.com</a>
              </p>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  )
}

SectionContactUs.propTypes = {
  id: PropTypes.string
}

export default SectionContactUs
