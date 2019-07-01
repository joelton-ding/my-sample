import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000
}

const HomeSlider = () => {
  return (
    <Slider className="slider" {...settings}>
      <div>
        <div className="section-content first">
          <h1>
            What
            <br /> We Do
          </h1>
          <div className="section-content-inner">
            <p>
              Meaningful, effective design speaks to your head, and your heart.
            </p>
            <p>
              That’s why we work collaboratively with our clients, and with each
              other: to go from insight to ideas to design that connects.
            </p>
            <p>
              Our singular focus is to delivering beautiful and engaging digital
              experiences for our clients, whether they are start-ups or
              established businesses.
            </p>
            <p>
              We are able to strike a balance between excellence and
              affordability for big and small businesses.
            </p>
            <p>
              Put our creativity and experience to work for your next project.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="section-content first">
          <h1>
            <span>
              How <br />
              We Are <br />
              Different
            </span>
          </h1>
          <div className="section-content-inner">
            <p>
              We are made up of passionate people who have been designing and
              building websites and digital experiences since we learned how to
              design and code.
            </p>
            <p>
              Our clients’ aspirations and business objectives are different
              hence we use a tailored approach to deliver functional, enduring
              and effective design solutions.
            </p>
            <p>
              Ensuring our work is well balanced and fit for purpose, we are
              united as one team and our experiences are shared.
            </p>
          </div>
          {/* <button  className="button-scroll-down">
                Click me to move down
              </button> */}
        </div>
      </div>
    </Slider>
  )
}

export default HomeSlider
