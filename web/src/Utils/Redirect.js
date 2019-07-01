import React from 'react'
import PropTypes from 'prop-types'

const Link = props => {
  const { path, target, children, className } = props

  const handleClick = path => {
    window.location.href = path
  }

  return (
    <a onClick={() => handleClick(path)} target={target} className={className}>
      {children}
    </a>
  )
}

const Fn = path => {
  window.location.href = path
}

Link.propTypes = {
  path: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
  target: PropTypes.string
}

const Redirect = { Link, Fn }
export default Redirect
