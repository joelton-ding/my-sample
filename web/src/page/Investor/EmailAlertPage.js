import React from 'react';
import Header from '../../layout/Header'
import Banner from './Banner'
import Footer from '../../layout/Footer'
import EmailAlert from './EmailAlert/EmailAlert'

const EmailAlertPage = () => {
  return (
    <React.Fragment>
      <Header />
      <Banner />
      <EmailAlert />
      <Footer />
    </React.Fragment>
  )
}

export default EmailAlertPage


