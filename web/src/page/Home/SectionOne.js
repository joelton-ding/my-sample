import React from 'react'
import Fade from 'react-reveal/Fade'
import BackgroundOne from '../../images/homepage-bg-1.jpg'
import HomeSlider from './HomeSlider'
import PropTypes from 'prop-types'

const sectionStyle1 = {
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${BackgroundOne})`
}

const SectionOne = props => {
  return (
    <div className="section-container" id={props['id']}>
      <div className="section backgroundImg" style={sectionStyle1}>
        <Fade>
          <HomeSlider />
          <div className="scroll-downs">
            <div className="mousey">
              <div className="scroller" />
            </div>
          </div>
        </Fade>
      </div>
    </div>
  )
}

SectionOne.propTypes = {
  id: PropTypes.string
}

export default SectionOne
