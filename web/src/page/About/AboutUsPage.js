import React from 'react'
import Header from '../../layout/Header'
import Footer from '../../layout/Footer'
import Banner from './Banner'
import AboutUs from './AboutUs/AboutUs'

const AboutUsPage = () => {
  return (
    <React.Fragment>
      <Header />
      <Banner />
      <AboutUs />
      <Footer />
    </React.Fragment>
  )
}

export default AboutUsPage