import React from 'react'
import Fade from 'react-reveal/Fade'
import BackgroundTwo from '../../images/homepage-bg-2.jpg'
import PropTypes from 'prop-types'

const sectionStyle2 = {
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${BackgroundTwo})`
}
const SectionWebDevelopment = ({ id }) => {
  return (
    <div className="section-container" id={id}>
      <div className="section backgroundImg" style={sectionStyle2}>
        <Fade>
          <div className="section-content">
            <h1 className="sub">
              Web <div>Development</div>
            </h1>
            <div className="section-content-inner">
              <p>
                A website is the frontline for first impressions and design and
                function go hand in hand to motivate our clients’ target
                audience to take action.
              </p>
              <p>
                At Big Bang Design, we go beyond the aesthetics to create a
                digital experience that enthralls your stakeholders beyond the
                surface.
              </p>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  )
}

SectionWebDevelopment.propTypes = {
  id: PropTypes.string
}

export default SectionWebDevelopment
