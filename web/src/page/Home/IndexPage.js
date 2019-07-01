import React from 'react'
import Header from '../../layout/Header'
import HomeBanner from './HomeBanner'
import HomeContent from './HomeContent'
import Footer from '../../layout/Footer'

const IndexPage = () => {
  return (
    <div>
      <Header />
      <HomeBanner />
      <HomeContent />
      <Footer />
    </div>
  )
}

export default IndexPage
