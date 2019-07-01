// import React from "react";

// export default ({ close }) => (
//   <nav>
//   <div className="menu">
//     <ul className="menu-list">
//       <li className="">
//         <a href="/">Home</a>
//       </li>
//       <li>
//         <a href="/web-development">Web Development</a>
//       </li>
//       <li>Copy Writing</li>
//       <li>Multimedia Design
//         <ul>
//           <li>Logo &amp; Corporate Identity</li>
//           <li>Print Design</li>
//           <li>Digital Media</li>
//         </ul>
//       </li>
//       <li>Contact Us</li>
//     </ul>
//   </div>
//   </nav>
// )


// import React from 'react'
// import PropTypes from 'prop-types'
// import { withRouter } from 'react-router-dom'
// import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap'

// const Header = props => {
//   console.log(props.location ? props.location.pathname : '=====')
//   const OverviewMenu = ['/about-us', '/director', '/key-executive']
//   const TechnologyMenu = [
//     '/clear-cell-fx1-system',
//     '/value-propositions',
//     '/applications'
//   ]
//   const ResourcesMenu = [
//     '/brochure',
//     '/scientifics-resources',
//     '/posters',
//     '/publications',
//     '/safety-data-sheet',
//     '/AACR2019',
//     '/feedback-forms'
//   ]
//   const InvestorRelationsMenu = [
//     '/business-model',
//     '/annual-reports',
//     '/announcements',
//     '/email-alert'
//   ]
//   const ContactMenu = [
//     '/corporate-office',
//     '/distributors',
//     '/careers-opportunity'
//   ]

//   let loadMenuStyle = menu => {
//     if (menu.includes(props.location.pathname)) {
//       return 'selected'
//     } else {
//       return ''
//     }
//   }

//   let loadMenuItemStyle = menu => {
//     if (props.location.pathname.indexOf(menu) > -1) {
//       return 'selected'
//     } else {
//       return ''
//     }
//   }

//   return (
//     <Navbar inverse collapseOnSelect fixedTop>
//       <Navbar.Header>
//         <Navbar.Brand>
//           <a href="/">
//             <img src={require('../images/logo-191x38.svg')} alt="Logo" />
//           </a>
//         </Navbar.Brand>
//         <Navbar.Toggle />
//       </Navbar.Header>
//       <Navbar.Collapse>
//         <Nav>
//           <NavDropdown
//             eventKey={1}
//             className={loadMenuStyle(OverviewMenu)}
//             title="Overview"
//             id="basic-nav-dropdown-1"
//           >
//             <MenuItem
//               eventKey={1.1}
//               href="/about-us"
//               className={loadMenuItemStyle('/about-us')}
//             >
//               About Us
//             </MenuItem>
//             <MenuItem
//               eventKey={1.2}
//               href="/director"
//               className={loadMenuItemStyle('/director')}
//             >
//               Board of Directors
//             </MenuItem>
//             <MenuItem
//               eventKey={1.3}
//               href="/key-executive"
//               className={loadMenuItemStyle('/key-executive')}
//             >
//               Key Executive Officers
//             </MenuItem>
//           </NavDropdown>
//           <NavDropdown
//             eventKey={2}
//             className={loadMenuStyle(TechnologyMenu)}
//             title="Technology"
//             id="basic-nav-dropdown-2"
//           >
//             <MenuItem
//               eventKey={2.1}
//               href="/clear-cell-fx1-system"
//               className={loadMenuItemStyle('/clear-cell-fx1-system')}
//             >
//               ClearCell<sup>®</sup> FX1 System
//             </MenuItem>
//             <MenuItem
//               eventKey={2.2}
//               href="/value-propositions"
//               className={loadMenuItemStyle('/value-propositions')}
//             >
//               Value Propositions
//             </MenuItem>
//           </NavDropdown>
//           <NavDropdown
//             eventKey={3}
//             className={loadMenuStyle(ResourcesMenu)}
//             title="Resources"
//             id="basic-nav-dropdow-3"
//           >
//             <MenuItem
//               eventKey={3.1}
//               href="/brochure"
//               className={loadMenuItemStyle('/brochure')}
//             >
//               Brochures
//             </MenuItem>
//             <MenuItem
//               eventKey={3.2}
//               href="/scientifics-resources"
//               className={loadMenuItemStyle('/scientifics-resources')}
//             >
//               Scientifics Resources
//             </MenuItem>
//             <MenuItem
//               eventKey={3.3}
//               href="/safety-data-sheet"
//               className={loadMenuItemStyle('/safety-data-sheet')}
//             >
//               Safety Data Sheet
//             </MenuItem>
//             <MenuItem
//               eventKey={3.4}
//               href="/AACR2019"
//               className={loadMenuItemStyle('/AACR2019')}
//             >
//               Events
//             </MenuItem>
//           </NavDropdown>
//           <NavDropdown
//             eventKey={4}
//             className={loadMenuStyle(InvestorRelationsMenu)}
//             title="Investor Relations"
//             id="basic-nav-dropdow-4"
//           >
//             <MenuItem
//               eventKey={4.1}
//               href="/business-model"
//               className={loadMenuItemStyle('/business-model')}
//             >
//               Business Model
//             </MenuItem>
//             <MenuItem
//               eventKey={4.2}
//               href="/annual-reports"
//               className={loadMenuItemStyle('/annual-reports')}
//             >
//               Annual Reports
//             </MenuItem>
//             <MenuItem
//               eventKey={4.3}
//               href="/announcements"
//               className={loadMenuItemStyle('/announcements')}
//             >
//               Announcements
//             </MenuItem>
//             <MenuItem
//               eventKey={4.3}
//               href="/email-alert"
//               className={loadMenuItemStyle('/email-alert')}
//             >
//               Email Alerts
//             </MenuItem>
//           </NavDropdown>
//           <NavDropdown
//             className={`last ${loadMenuStyle(ContactMenu)}`}
//             eventKey={5}
//             title={
//               <div>
//                 <img src={require('../images/icon-email.svg')} alt="Logo" />{' '}
//                 Contact{' '}
//               </div>
//             }
//             id="basic-nav-dropdow-5"
//           >
//             <MenuItem
//               eventKey={5.1}
//               href="/corporate-office"
//               className={loadMenuItemStyle('/corporate-office')}
//             >
//               Corporate Office
//             </MenuItem>
//             <MenuItem
//               eventKey={5.2}
//               href="/distributors"
//               className={loadMenuItemStyle('/distributors')}
//             >
//               Distributors
//             </MenuItem>
//             <MenuItem
//               eventKey={5.3}
//               href="/careers-opportunity"
//               className={loadMenuItemStyle('/careers-opportunity')}
//             >
//               Careers Opportunity
//             </MenuItem>
//             <MenuItem
//               eventKey={5.4}
//               href="https://survey.zohopublic.com/zs/njB5MU"
//               target="_blank"
//               className={loadMenuItemStyle('/feedback-forms')}
//             >
//               Feedback Forms
//             </MenuItem>
//           </NavDropdown>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   )
// }
// Header.propTypes = {
//   location: PropTypes.any
// }

// export default withRouter(Header)
