import React from 'react'
import Fade from 'react-reveal/Fade'

const today = new Date()

const Footer = props => {
  return (
    <Fade>
      <footer>
        <div className="footer">
          Copyright &copy; {today.getFullYear()} Big Bang Design Pte Ltd. All rights reserved
      </div>
      </footer>
    </Fade>
  )
}

export default Footer
