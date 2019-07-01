import React from 'react'
import Fade from 'react-reveal/Fade'
import BackgroundFour from '../../images/homepage-bg-4.jpg'
import PropTypes from 'prop-types'

const sectionStyle4 = {
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${BackgroundFour})`
}

const SectionCopyWriting = props => {
  return (
    <div className="section-container" id={props['id']}>
      <div className="section backgroundImg" style={sectionStyle4}>
        <Fade>
          <div className="section-content">
            <h1 className="sub">
              Copy <div>Writing</div>
            </h1>
            <div className="section-content-inner copy-write">
              <p>
                Your website only has a few seconds to make a great first
                impression and gain recognition and trust.
              </p>
              <p>
                So we make sure your message is clear. Consumers will always go
                where the conversation speaks their language.
              </p>
              <p>
                Copywriting is the art and science of strategically delivering
                words (whether written or spoken) that get people to take some
                form of action.
              </p>
              <p>
                Content also plays a role in Search Engine Optimisation (SEO),
                where quality content boosts your website’s relevance and search
                rankings.
              </p>
              <p>
                As more and more companies migrate to the digital world and the
                development of an online presence, having a website also creates
                an immediate and pressing need for quality content that appeal
                to your target audience.{' '}
              </p>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  )
}

SectionCopyWriting.propTypes = {
  id: PropTypes.string
}

export default SectionCopyWriting
