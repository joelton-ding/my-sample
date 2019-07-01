import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-scroll'

const MobileMenu = () => {
  return (
    <div className="mobile-nav clearfix">
      <ul className="mobile-menu">
        <li className="nav-item">
          <Link
            activeClass="active"
            to="section1"
            spy
            smooth
            offset={-70}
            duration={500}
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            activeClass="active"
            to="section2"
            spy
            smooth
            offset={-70}
            duration={500}
          >
            Web Development
          </Link>
        </li>
        <li className="nav-item">
          <Link
            activeClass="active"
            to="section3"
            spy
            smooth
            offset={-70}
            duration={500}
          >
            Copy Writing
          </Link>
        </li>
        <li className="nav-item">
          <Link
            activeClass="active"
            to="section4"
            spy
            smooth
            offset={-70}
            duration={500}
          >
            Multimedia Design
          </Link>
        </li>
        <li className="nav-item">
          <Link
            activeClass="active"
            to="section5"
            spy
            smooth
            offset={-70}
            duration={500}
          >
            Contact Us
          </Link>
        </li>
        <li className="nav-item">
          <Link
            activeClass="active"
            to="section6"
            spy
            smooth
            offset={-70}
            duration={500}
          >
            Enquiry Form
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default observer(MobileMenu)
