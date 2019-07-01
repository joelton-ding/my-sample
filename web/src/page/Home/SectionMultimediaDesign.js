import React from 'react'
import Fade from 'react-reveal/Fade'
import BackgroundFive from '../../images/homepage-bg-5.jpg'
import PropTypes from 'prop-types'

const sectionStyle5 = {
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${BackgroundFive})`
}

const SectionMultimediaDesign = props => {
  return (
    <div className="section-container" id={props['id']}>
      <div className="section backgroundImg" style={sectionStyle5}>
        <Fade>
          <div className="section-content">
            <h1 className="sub">
              Multimedia <div>Design</div>
            </h1>
            <div className="section-content-inner multimedia-design">
              <p>
                Multimedia design is the art of integrating multiple forms of
                media.
              </p>
              <p>
                Digital design permeates many aspects of our everyday lives and
                it has become an increasingly important area.
              </p>
              <p>
                Different businesses have different needs, and to fully capture
                what you require, you will find our extensive range of
                capabilities adequate to engage your customers and make them
                remember your services and products.
              </p>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  )
}

SectionMultimediaDesign.propTypes = {
  id: PropTypes.string
}

export default SectionMultimediaDesign
